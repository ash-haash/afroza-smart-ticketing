document.addEventListener("DOMContentLoaded", function () {
    const seats = document.querySelectorAll(".seat");
    const numberOfSelectedSeat = document.getElementById("number-of-selected-seat");
    const totalSeatDisplay = document.getElementById("total-seat");
    let totalSeats = 40;
    let selectedSeats = 0;

    const tableBody = document.querySelector(".table-body");
    const phoneNumberInput = document.getElementById("phone_number");
    const nextButton = document.getElementById("next");

    function seatClickHandler() {
        // removing classes on seat deselection, also reducing selected seats total and increasing total seats value. doing just reverse on else block.
        if (this.classList.contains('selected', 'bg-[#1DD100]', 'text-white')) {
            this.classList.remove('selected', 'bg-[#1DD100]', 'text-white');
            selectedSeats--;
            totalSeats++;

            removeTableRow(this.textContent);
        } else {
            if (selectedSeats < 4) {
                this.classList.add('selected', 'bg-[#1DD100]', 'text-white');
                selectedSeats++;
                totalSeats--;
                // adding new row after getting data from selected seat
                const newTableRow = `
                    <tr">
                        <td class="px-4 py-2">${this.innerText}</td>
                        <td class="px-4 py-2">Economy</td>
                        <td class="text-right px-4 py-2">550/=</td>
                    </tr>
                    `;

                tableBody.insertAdjacentHTML('beforeend', newTableRow);
            } else {
                // modal to display alert on seat selection limit
                const modalHTML = `
                    <dialog id="my_modal_1" class="modal">
                        <div class="modal-box">
                            <h3 class="font-bold text-red-600 text-lg">Warning!</h3>
                            <p class="py-4 text-lg">You can only select up to 4 seats.</p>
                            <div class="modal-action">
                                <button id="closeButton" class="btn">Close</button>
                            </div>
                        </div>
                    </dialog>
                    `;
                const tempElement = document.createElement('div');
                tempElement.innerHTML = modalHTML;

                document.body.appendChild(tempElement.firstElementChild);

                const modal = document.getElementById("my_modal_1");
                modal.showModal();

                const closeButton = document.getElementById("closeButton");
                closeButton.addEventListener("click", function () {
                    modal.close();
                    modal.remove();
                });
            }
        }

        const totalPriceRow = document.getElementById('total-price-row');

        // updating and styling selected seat number <sup> value
        if (selectedSeats === 0) {
            numberOfSelectedSeat.classList.add('hidden')
            totalPriceRow.classList.add('hidden');
        } else {
            numberOfSelectedSeat.classList.add('bg-[#1DD100]', 'text-white');
            numberOfSelectedSeat.classList.remove('hidden');

            totalPriceRow.classList.remove('hidden');
        }

        numberOfSelectedSeat.innerText = selectedSeats;
        totalSeatDisplay.innerText = totalSeats;

        // displaying total price
        const totalPriceElement = document.getElementById('total-price');
        totalPriceElement.innerText = parseFloat(calculateTotalPrice());


        toggleNextButton();
    }

    seats.forEach(seat => {
        seat.addEventListener("click", seatClickHandler);
    });

    // removing table rows upon deselection of the seats
    function removeTableRow(seatName) {
        var rows = tableBody.querySelectorAll("tr");
        rows.forEach(function (row) {
            if (row.querySelector("td:first-child").textContent === seatName) {
                row.remove();
            }
        });
    }

    const couponInput = document.getElementById('coupon-input');
    const couponApplyButton = document.getElementById('coupon-apply');
    const grandTotalRow = document.getElementById('grand-total-row');
    const grandTotalElement = document.getElementById('grand-total');
    const totalPriceElement = document.getElementById('total-price');
    const couponForm = document.getElementById('coupon-form');

    // approved coupon and their discount value
    const couponCodes = {
        "NEW15": 0.15,
        "Couple 20": 0.20
    };

    // calculating total price to make grand total calculation easy after coupon apply
    function calculateTotalPrice() {
        const selectedSeats = parseFloat(document.getElementById("number-of-selected-seat").innerText);
        const seatPrice = 550;
        return selectedSeats * seatPrice;
    }

    // validating coupon and removing coupon field if it's correct
    function applyCoupon(couponCode) {
        if (couponCodes.hasOwnProperty(couponCode) && selectedSeats === 4) {
            const discountPercentage = couponCodes[couponCode];
            const totalPrice = calculateTotalPrice();
            const discountedPrice = totalPrice * (1 - discountPercentage);
            grandTotalElement.innerText = discountedPrice.toString();
            grandTotalRow.classList.remove('hidden');
            couponForm.classList.add('hidden');

            // preventing user from selecting seats when a coupon applied and grand total been provided
            seats.forEach(seat => {
                seat.removeEventListener("click", seatClickHandler);
            });
        } else {
            couponForm.classList.remove('hidden');
        }
    }

    couponApplyButton.addEventListener('click', function (event) {
        event.preventDefault();
        const enteredCoupon = couponInput.value.trim();
        applyCoupon(enteredCoupon);
    });


    // validating provided phone number (11 digit)
    function validatePhoneNumber(phoneNumber) {
        const phoneNumberRegex = /^\d{11}$/;
        return phoneNumberRegex.test(phoneNumber);
    }

    // next button will only be activated when user selected at least one seat and provided a valid phone number
    function toggleNextButton() {
        const phoneNumber = phoneNumberInput.value.trim();
        if (validatePhoneNumber(phoneNumber) && selectedSeats > 0) {
            nextButton.removeAttribute("disabled");
            nextButton.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            nextButton.setAttribute("disabled", "disabled");
            nextButton.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    phoneNumberInput.addEventListener("input", toggleNextButton);

    function nextButtonClickHandler() {
        event.preventDefault();
        const modal = document.getElementById("my_modal_2");
        modal.showModal();
    }

    nextButton.addEventListener("click", nextButtonClickHandler);
});

