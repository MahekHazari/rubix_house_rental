import React, { useContext, useState, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart } from "react-icons/ai";
import "./Property.css";
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Map from "../../components/Map/Map";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
import UserDetailContext from "../../context/UserDetailContext.js";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from "../../components/Heart/Heart";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const { data, isLoading, isError } = useQuery(["resd", id], () =>
    getProperty(id)
  );

  const [modalOpened, setModalOpened] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const showPriceBreakdown = () => {
    setShowBreakdown(!showBreakdown); // Toggle the visibility of the breakdown
  };

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));
      toast.success("Booking cancelled", { position: "bottom-right" });
    },
  });

  // Debugging the `data` object
  useEffect(() => {
    console.log(data); // Check the structure of the data object
  }, [data]);

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* like button */}
        <div className="like">
          <Heart id={id} />
        </div>

        {/* image */}
        <img src={data?.image} alt="home image" />

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.price}
              </span>
              <span>
                <button
                  className="PriceDetails button"
                  onClick={showPriceBreakdown}
                >
                  View Breakdown &rarr;
                </button>
              </span>
            </div>

            {/* Price Breakdown (conditional rendering) */}
            {showBreakdown && (
              <div className="price-breakdown">
                <h3>Price Breakdown</h3>
                <ul>
                  <li>
                    <strong>Base Rent:</strong> {data?.price * 0.8}
                  </li>{" "}
                  {/* 80% of total price */}
                  <li>
                    <strong>Utilities:</strong>{" "}
                    {data?.Utilities
                      ? data?.Utilities * data?.price
                      : data?.price * 0.08}
                  </li>{" "}
                  {/* 8% default if no value */}
                  <li>
                    <strong>Deposit:</strong>{" "}
                    {data?.Deposit
                      ? data?.Deposit * data?.price
                      : data?.price * 0.05}
                  </li>{" "}
                  {/* 5% default if no value */}
                  <li>
                    <strong>CAM:</strong>{" "}
                    {data?.CAM ? data?.CAM * data?.price : data?.price * 0.07}
                  </li>{" "}
                  {/* 7% default if no value */}
                  <li>
                    <strong>Total:</strong> {data?.price}
                  </li>
                </ul>
              </div>
            )}

            {/* facilities */}
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities?.parking} Parking</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities?.bedrooms} Room/s</span>
              </div>
            </div>

            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address} {data?.city} {data?.country}
              </span>
            </div>

            {/* Ratings Section */}
            <div className="ratings-container">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Ratings
              </h3>
              <div className="gap-8 sm:grid sm:grid-cols-2">
                <div>
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Location
                    </dt>
                    <dd className="flex items-center mb-3">
                      <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                        <div
                          className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                          style={{ width: `${data?.ratings?.Location * 20}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {data?.ratings?.Location
                          ? `${data.ratings.Location}/5`
                          : "4.2"}
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Facilities
                    </dt>
                    <dd className="flex items-center mb-3">
                      <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                        <div
                          className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                          style={{
                            width: `${data?.ratings?.Facilities * 20}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {data?.ratings?.Facilities
                          ? `${data.ratings.Facilities}/5`
                          : "4.6"}
                      </span>
                    </dd>
                  </dl>
                </div>
                <div>
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Cleanliness
                    </dt>
                    <dd className="flex items-center mb-3">
                      <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                        <div
                          className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                          style={{
                            width: `${data?.ratings?.Cleanliness * 20}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {data?.ratings?.Cleanliness
                          ? `${data.ratings.Cleanliness}/5`
                          : "4.9"}
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Value for Money
                    </dt>
                    <dd className="flex items-center">
                      <div className="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                        <div
                          className="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                          style={{
                            width: `${data?.ratings?.ValueForMoney * 20}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {data?.ratings?.ValueForMoney
                          ? `${data.ratings.ValueForMoney}/5`
                          : "4.7"}
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            {/* booking button */}
            {bookings?.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}
                >
                  <span>Cancel booking</span>
                </Button>
                <span>
                  Your visit already booked for date{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date}
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
              >
                Book your visit
              </button>
            )}

            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
          </div>

          {/* right side */}
          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
