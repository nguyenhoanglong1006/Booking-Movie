import './styles.css';
import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { CinemaContext } from '~/store/Context';
import GheService from '~/services/gheService';

function ChooseSeat({ lichchieu, dsGhe }) {
    const { selectedSeats, setSelectedSeats } = useContext(CinemaContext);
    const [dsGheDaBan, setDsGheDaBan] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await GheService.getDsGheDaBan(lichchieu.id);
            setDsGheDaBan(res);
        };
        fetchApi();
    }, [lichchieu.id]);
    const loadDsGheDaBan = () => {
        const listOccupied = [];
        dsGheDaBan.forEach((ghe) => {
            const occupied = ghe.hang + ghe.cot;
            listOccupied.push(occupied);
        });
        lichchieu.occupied = [...listOccupied];
    };

    loadDsGheDaBan();

    return (
        <div className="container">
            <Cinema
                lichchieu={lichchieu}
                seats={dsGhe}
                selectedSeats={selectedSeats}
                onSelectedSeatsChange={(selectedSeats) => setSelectedSeats(selectedSeats)}
            />

            <div className="line"></div>

            <ShowCase />

            <div className="info">
                Bạn đã chọn <span className="count">{selectedSeats.length}</span> ghế với tổng tiền là{' '}
                <span className="total">{selectedSeats.length * 85000} vnd</span>
            </div>
        </div>
    );
}

function ShowCase() {
    return (
        <ul className="showCase">
            <li>
                <span className="seat" /> <div>Ghế trống</div>
            </li>
            <li>
                <span className="seat selected" /> <div>Ghế đang chọn</div>
            </li>
            <li>
                <span className="seat occupied" /> <div>Ghế đã bán</div>
            </li>
        </ul>
    );
}

function Cinema({ lichchieu, seats, selectedSeats, onSelectedSeatsChange }) {
    function handleSelectedState(seat) {
        const isSelected = selectedSeats.includes(seat);
        if (isSelected) {
            onSelectedSeatsChange(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
        } else {
            onSelectedSeatsChange([...selectedSeats, seat]);
        }
    }

    return (
        <div className="cinema">
            <div className="screen">Screen</div>

            <div className="seats">
                {seats.map((seat, index) => {
                    const isSelected = selectedSeats.includes(seat);
                    const isOccupied = lichchieu.occupied.includes(seat.hang + seat.cot);

                    return (
                        <span
                            tabIndex="0"
                            key={index}
                            className={clsx('seat', isSelected && 'selected', isOccupied && 'occupied')}
                            onClick={isOccupied ? null : () => handleSelectedState(seat)}
                            onKeyPress={
                                isOccupied
                                    ? null
                                    : (e) => {
                                          if (e.key === 'Enter') {
                                              handleSelectedState(seat);
                                          }
                                      }
                            }
                        >
                            <div className="label">{seat.hang + seat.cot}</div>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

export default ChooseSeat;
