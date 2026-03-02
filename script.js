/* -----------------------------
    SCRIPT.JS - Aotearoa Adventure Gear
   ----------------------------- */

/* 1. Featured Products Carousel - Home Page ---------------------- */
// The DOMContentLoaded event fires when the initial HTML document has been completely loaded
// and parsed, without waiting for stylesheets, images, and subframes to finish loading.
// We use this event to safely access and manipulate DOM elements once they're available.
document.addEventListener("DOMContentLoaded", function () {
    // Initialize Bootstrap carousel if exists (home page featured products)
    // We check for an element with the class "carousel" and create a Carousel instance
    // to start the automatic sliding behaviour. The settings below make the slides change
    // every 3 seconds and allow wrapping from the last back to the first slide.
    const carouselElement = document.querySelector(".carousel");
    if (carouselElement) {
        const carousel = new bootstrap.Carousel(carouselElement, {
            interval: 3000, // change slide every 3s
            wrap: true
        });
    }

    /* 2. Floating Back-to-Top Button -------------------------------- */
    // We dynamically create a button element rather than placing it in the HTML
    // so that it is available on all pages without modifying each file.
    // The styling positions it fixed in the lower-right corner and hides it initially.
    const backToTop = document.createElement("button");
    backToTop.id = "backToTop";
    backToTop.innerText = "↑ Top";
    backToTop.style.position = "fixed";
    backToTop.style.bottom = "30px";
    backToTop.style.right = "30px";
    backToTop.style.padding = "10px 15px";
    backToTop.style.backgroundColor = "#503D36";
    backToTop.style.color = "#fff";
    backToTop.style.border = "none";
    backToTop.style.borderRadius = "5px";
    backToTop.style.cursor = "pointer";
    backToTop.style.display = "none"; // start hidden
    backToTop.style.zIndex = "9999";
    document.body.appendChild(backToTop);

    // Show/hide button on scroll: we listen for the window's scroll event and
    // toggle the button's display based on how far the user has scrolled down.
    window.addEventListener("scroll", () => {
        backToTop.style.display = window.scrollY > 200 ? "block" : "none";
    });

    // When clicked, smoothly scroll the document back to the top.
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* 3. Free Shipping Offer - Shipping Page ------------------------ */
    // On the shipping summary page we inspect the displayed subtotal amount.
    // If the customer has reached the minimum for free shipping (600 dollars),
    // update the shipping row to show "FREE" and adjust the total accordingly.
    const subtotalElement = document.querySelector("#subtotal");
    const shippingElement = document.querySelector("#shipping");
    const totalElement = document.querySelector("#total");

    if (subtotalElement && shippingElement && totalElement) {
        const subtotal = parseFloat(subtotalElement.innerText.replace("$", ""));
        if (subtotal >= 600) {
            shippingElement.innerText = "FREE";
            totalElement.innerText = `$${subtotal.toFixed(2)}`;
        }
    }

    /* 4. Cart Quantity Adjustments - Cart Page ---------------------- */
    const qtyInputs = document.querySelectorAll(".cart-quantity");
    qtyInputs.forEach(input => {
        const btnUp = input.parentElement.querySelector(".qty-up");
        const btnDown = input.parentElement.querySelector(".qty-down");

        btnUp?.addEventListener("click", () => {
            input.value = parseInt(input.value) + 1;
            updateCartTotal(input.closest(".cart-item"));
        });

        btnDown?.addEventListener("click", () => {
            let val = parseInt(input.value);
            if (val > 1) {
                input.value = val - 1;
                updateCartTotal(input.closest(".cart-item"));
            }
        });
    });

    // updateCartTotal: helper function attached to quantity controls
    // Parameters:
    //   item - the .cart-item DOM element whose total should be recalculated.
    // Behavior:
    //   * Find the unit price text and quantity input inside the given item.
    //   * Convert those strings to numbers (stripping the dollar sign).
    //   * Multiply price by quantity to calculate the line total.
    //   * Write the formatted total back into the .item-total span so the user
    //     sees the updated amount immediately.
    function updateCartTotal(item) {
        const priceElement = item.querySelector(".item-price");
        const qtyElement = item.querySelector(".cart-quantity");
        const totalElement = item.querySelector(".item-total");

        const price = parseFloat(priceElement.innerText.replace("$", ""));
        const qty = parseInt(qtyElement.value);
        totalElement.innerText = `$${(price * qty).toFixed(2)}`;
    }
});