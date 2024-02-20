document.addEventListener("DOMContentLoaded", function () {
    const seats = document.querySelectorAll(".seat");
    const numberOfSelectedSeat = document.getElementById("number-of-selected-seat");
    const totalSeatDisplay = document.getElementById("total-seat");
    let totalSeats = 40;
    let selectedSeats = 0;

    const tableBody = document.querySelector(".table-body");

    seats.forEach(seat => {
        seat.addEventListener("click", function () {
            if (seat.classList.contains('selected', 'bg-[#1DD100]', 'text-white')) {
                seat.classList.remove('selected', 'bg-[#1DD100]', 'text-white');
                selectedSeats--;
                totalSeats++;

                removeTableRow(seat.textContent);
            } else {
                if (selectedSeats < 4) {
                    seat.classList.add('selected', 'bg-[#1DD100]', 'text-white');
                    selectedSeats++;
                    totalSeats--;
                    const newTableRow = `
                    <tr">
                        <td class="px-4 py-2">${seat.innerText}</td>
                        <td class="px-4 py-2">Economy</td>
                        <td class="text-right px-4 py-2">550/=</td>
                    </tr>
                    `;

                    tableBody.insertAdjacentHTML('beforeend', newTableRow);
                } else {
                    const modalHTML = `
                        <dialog id="my_modal_1" class="modal">
                            <div class="modal-box">
                                <h3 class="font-bold text-lg">Alert</h3>
                                <p class="py-4">You can only select up to 4 seats.</p>
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
                // function closeModal() {
                //     var modal = document.getElementById("my_modal_1");
                //     modal.close();
                //     // Remove modal from DOM after closing
                //     modal.remove();
                // }

            }

            const totalPriceRow = document.getElementById('total-price-row');

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

            const totalPriceElement = document.getElementById('total-price');
            const totalPrice = selectedSeats * 550;
            totalPriceElement.innerText = totalPrice;

        });
    });
    function removeTableRow(seatName) {
        var rows = tableBody.querySelectorAll("tr");
        rows.forEach(function (row) {
            if (row.querySelector("td:first-child").textContent === seatName) {
                row.remove();
            }
        });
    }



});

