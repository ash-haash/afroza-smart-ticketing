document.addEventListener("DOMContentLoaded", function () {
    const seats = document.querySelectorAll(".seat");
    const numberOfSelectedSeat = document.getElementById("number-of-selected-seat");
    const totalSeatDisplay = document.getElementById("total-seat");
    let totalSeats = 40;
    let selectedSeats = 0;

    seats.forEach(seat => {
        seat.addEventListener("click", function () {
            if (seat.classList.contains('selected', 'bg-[#1DD100]', 'text-white')) {
                seat.classList.remove('selected', 'bg-[#1DD100]', 'text-white');
                selectedSeats--;
                totalSeats++;
            } else {
                if (selectedSeats < 4) {
                    seat.classList.add('selected', 'bg-[#1DD100]', 'text-white');
                    selectedSeats++;
                    totalSeats--;
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
            numberOfSelectedSeat.innerText = selectedSeats;
            totalSeatDisplay.innerText = totalSeats;
        });
    });
});