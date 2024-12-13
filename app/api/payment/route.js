import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const getActiveProducts = async () => {
    const checkProducts = await stripe.products.list();
    const availableProducts = checkProducts.data.filter(
        (product) => product.active === true
    );
    return availableProducts;
};

const getPriceForProduct = async (productId, currency) => {
    const prices = await stripe.prices.list({ product: productId });
    return prices.data.find((price) => price.currency === currency);
};

export const POST = async (request) => {
    const { products } = await request.json();
    if (!products || !Array.isArray(products)) {
        return NextResponse.json({ error: "Invalid products data" }, { status: 400 });
    }

    // Normalize and validate product data
    const normalizedProducts = products.map((product) => ({
        name: product.name || product.slug, // Use slug as fallback for name
        price: Number(product.price) || 0,
        quantity: Number(product.quantity) || 0,
    }));

    let activeProducts = await getActiveProducts();

    try {
        for (const product of normalizedProducts) {
            if (!product.name || product.price <= 0) {
                console.error("Invalid product data:", product);
                continue;
            }

            const stripeProduct = activeProducts?.find(
                (stripeProduct) =>
                    stripeProduct?.name?.toLowerCase() === product?.name?.toLowerCase()
            );

            if (!stripeProduct) {
                try {
                    const createdProduct = await stripe.products.create({
                        name: product.name,
                    });

                    await stripe.prices.create({
                        unit_amount: Math.round(product.price * 100), // Ensure integer value
                        currency: "inr", // Set currency to INR
                        product: createdProduct.id,
                    });

                    activeProducts = await getActiveProducts(); // Refresh active products
                } catch (error) {
                    console.error(
                        `Error creating Stripe product for ${product.name}:`,
                        error
                    );
                }
            }
        }
    } catch (error) {
        console.error("Error processing products:", error);
        return NextResponse.json(
            { error: "Failed to create or update products" },
            { status: 500 }
        );
    }

    activeProducts = await getActiveProducts();
    const stripeItems = [];

    for (const product of normalizedProducts) {
        const stripeProduct = activeProducts?.find(
            (prod) => prod?.name?.toLowerCase() === product?.name?.toLowerCase()
        );

        if (stripeProduct) {
            const price = await getPriceForProduct(stripeProduct.id, "inr");

            if (price) {
                stripeItems.push({
                    price: price.id,
                    quantity: product.quantity || 1,
                });
            } else {
                console.warn(
                    `No INR price found for product: ${stripeProduct.name}`
                );
            }
        } else {
            console.warn(`No matching active product found for ${product.name}`);
        }
    }

    if (stripeItems.length === 0) {
        return NextResponse.json(
            { error: "No valid items for Stripe checkout" },
            { status: 400 }
        );
    }

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: stripeItems,
            mode: "payment",
            success_url: "http://localhost:3000",
            cancel_url: "http://localhost:3000",
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Error creating Stripe checkout session:", error);
        return NextResponse.json({ error: "Checkout session failed" }, { status: 500 });
    }
};
