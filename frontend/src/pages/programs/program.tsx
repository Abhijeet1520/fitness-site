import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ProgramWeekNav from "../../components/programWeeksNav/index";
import { useAuth } from "../../contexts/authContext";
import { fetchCourseDetail, fetchUserSubscribedCourses } from "@services/apiService";
import { Course } from "@services/interfaces";

const Program: React.FC = () => {
  // const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { userLoggedIn } = useAuth();

  const programID = useParams().name;
  const [program, setProgram] = useState<Course | null>(null);

  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const programs = [
    {
      name: "Booty",
      includedImage: "/assets/alt7.jpeg",
      forMeImage: "/assets/alt4.jpeg",
      resultsExpectImage: "/assets/alt5.jpeg",
      followingProgramImage: "/assets/alt6.jpeg",
      included:
        "Our six-week booty workout program offers a comprehensive fitness plan designed to sculpt and strengthen your glutes. You'll receive a detailed workout schedule with a mix of resistance training, cardio, and flexibility exercises. Each week includes instructional videos, step-by-step guides, and access to a community forum for support and motivation. Supplementary resources like meal plans and recovery tips are also provided to help you achieve optimal results.",
      forMe:
        "This program is perfect for anyone looking to enhance their booty shape and overall lower body strength. Whether you’re a beginner or have some experience with fitness, our program is adaptable to various fitness levels. If you're motivated to commit to a structured plan and are eager to see noticeable changes in six weeks, this program is tailored for you.",
      resultsExpect:
        "By the end of the six weeks, you can expect to see a more toned and lifted booty. Our program is designed to increase muscle definition and strength, resulting in improved shape and firmness. Consistency and dedication will also help improve your overall fitness, including better endurance and enhanced posture.",
      followingProgram:
        "To get the most out of this program, follow the weekly workout schedule and complete each exercise with proper form. Engage with the instructional videos and utilize the provided guides for technique and motivation. Stay consistent with the workouts, follow the supplementary meal and recovery plans, and actively participate in the community for additional support and accountability.",
    },
    {
      name: "Abs",
      includedImage: "https://picsum.photos/400",
      forMeImage: "https://picsum.photos/400",
      resultsExpectImage: "https://picsum.photos/400",
      followingProgramImage: "https://picsum.photos/400",
      included:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      forMe:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      resultsExpect:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      followingProgram:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      name: "Arms",
      includedImage: "https://picsum.photos/400",
      forMeImage: "https://picsum.photos/400",
      resultsExpectImage: "https://picsum.photos/400",
      followingProgramImage: "https://picsum.photos/400",
      included:
        "Arms lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      forMe:
        "Arms lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      resultsExpect:
        "Arms lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      followingProgram:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  useEffect(() => {
    const getProgramDetails = async () => {
      try {
        const program = await fetchCourseDetail(programID + "");
        if (!program) {
          // Navigate to '/programs' if the program is not found
          navigate("/programs");
        } else {
          // Set the program details
          setProgram(program);
        }
      } catch (error) {
        // Handle errors, e.g., network errors
        console.error("Error fetching program details:", error);
        navigate("/programs");
      }
    };

    getProgramDetails();
  }, [programID, navigate]);

  useEffect(() => {
    const checkIfUserOwnsTheProgramIfUserIsLoggedIn = async () => {
      try {
        const courses = await fetchUserSubscribedCourses(); // Fetch the subscribed courses
        const programOwned = courses.some(course => course.id.toString() === programID); // Check if the user owns the program
        setIsSubscribed(programOwned);
      } catch (err) {
        setError("Error fetching user subscription details");
        console.error("Error fetching user subscription detail", err);
      } finally {
        setLoading(false); // Ensure loading state is turned off
      }
    };

    if (userLoggedIn) { // Ensure the user is logged in before making the API call
      checkIfUserOwnsTheProgramIfUserIsLoggedIn();
    } else {
      setLoading(false);
    }
  }, [programID, userLoggedIn]);

  if (!program) return null;

  if (loading) {
    return <p>Loading...</p>; // Show a loading state while fetching data
  }

  if (error) {
    return <p>{error}</p>; // Show an error message if there was an issue
  }

  return (
    <div className="p-0 m-0">
      <div className="flex flex-col h-full px-[10%] font-serif">
        <div className="border-b-2 px-[2%]">
          <h1 className="text-left text-black text-5xl font-bold m-5 pt-10">
            {program.name} Program
          </h1>
        </div>

        {!(!userLoggedIn || !isSubscribed) && (
          <>
            <ProgramWeekNav programID={programID} />
            <Outlet />
          </>
        )}

        {location.pathname === `/programs/${programID!}` && (
          <>
            <div className="flex flex-col p-5 m-5 bg-[#FAFAF5] border border-[#E6E6E6] rounded-2xl">
              <div className="w-full">
                <h2 className="text-left text-black text-xl sm:text-3xl font-bold m-5">
                  What's included?
                </h2>
              </div>
              <div className="flex flex-wrap justify-between gap-10 m-5">
                <p className="text-left text-black text-lg font-normal xl:w-[50%] w-full">
                  {programs[0].included}
                </p>
                <div className="xl:w-fit w-full md:flex md:justify-center">
                  <img
                    src={programs[0].includedImage}
                    alt="includedImage"
                    className="rounded-lg h-[350px] sm:h-[450px]"
                  />
                </div>
              </div>
            </div>

            {/*onClick={() => doSomething()}*/}
            {(!userLoggedIn || !isSubscribed) && (
              <div className="priceButtonContainer flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-2 p-4 sm:p-6 w-full max-w-lg mx-auto">
              <span className="priceValue text-lg sm:text-xl font-bold">
                Price: ${program.price} AUD
              </span>
                <button
                  type="submit"
                  className={`m-auto place-self-center p-2 px-4 text-white font-semibold rounded-full bg-[#525252] active:bg-[#6D6D6D] hover:bg-[#525252] hover:shadow-xl active:bg-[#3b3b3b]'}`}
                  onClick={()=> navigate(`/checkout/${programID}`)}
                >
                  Buy Now
                </button>
              </div>
            )}

            <div className="flex flex-col p-5 m-5 bg-[#FAFAF5] border border-[#E6E6E6] rounded-2xl">
              <div className="w-full">
                <h2 className="text-left text-black text-xl sm:text-3xl font-bold m-5">
                  Is This The Program For Me?
                </h2>
              </div>
              <div className="flex flex-wrap justify-between gap-10 m-5">
                <div className="xl:w-fit w-full md:flex md:justify-center">
                  <img
                    src={programs[0].forMeImage}
                    alt="forMe"
                    className="rounded-lg h-[350px] sm:h-[450px]"
                  />
                </div>
                <p className="text-left text-black text-lg font-normal xl:w-[50%] w-full">
                  {programs[0].forMe}
                </p>
              </div>
            </div>

            {/*onClick={() => doSomething()}*/}
            {(!userLoggedIn || !isSubscribed) && (
              <div className="priceButtonContainer flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-2 p-4 sm:p-6 w-full max-w-lg mx-auto">
              <span className="priceValue text-lg sm:text-xl font-bold">
                Price: ${program.price} AUD
              </span>
                <button
                  type="submit"
                  className={`m-auto place-self-center p-2 px-4 text-white font-semibold rounded-full bg-[#525252] active:bg-[#6D6D6D] hover:bg-[#525252] hover:shadow-xl active:bg-[#3b3b3b]'}`}
                  onClick={()=> navigate(`/checkout/${programID}`)}
                >
                  Buy Now
                </button>
              </div>
            )}

            <div className="flex flex-col p-5 m-5 bg-[#FAFAF5] border border-[#E6E6E6] rounded-2xl">
              <div className="w-full">
                <h2 className="text-left text-black text-xl sm:text-3xl font-bold m-5">
                  What Results To Expect
                </h2>
              </div>
              <div className="flex flex-wrap justify-between gap-10 m-5">
                <p className="text-left text-black text-lg font-normal xl:w-[50%] w-full">
                  {programs[0].resultsExpect}
                </p>
                <div className="xl:w-fit w-full md:flex md:justify-center">
                  <img
                    src={programs[0].resultsExpectImage}
                    alt="expectedResults"
                    className="rounded-lg h-[350px] sm:h-[450px]"
                  />
                </div>
              </div>
            </div>

            {/*onClick={() => doSomething()}*/}
            {(!userLoggedIn || !isSubscribed) && (
              <div className="priceButtonContainer flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-2 p-4 sm:p-6 w-full max-w-lg mx-auto">
              <span className="priceValue text-lg sm:text-xl font-bold">
                Price: ${program.price} AUD
              </span>
              <button
                type="submit"
                className={`m-auto place-self-center p-2 px-4 mb-4 text-white font-semibold rounded-full bg-[#525252] active:bg-[#6D6D6D] hover:bg-[#525252] hover:shadow-xl active:bg-[#3b3b3b]'}`}
                onClick={()=> navigate(`/checkout/${programID}`)}
              >
                Buy Now
              </button>
              </div>
            )}

            <div className="flex flex-col p-5 m-5 bg-[#FAFAF5] border border-[#E6E6E6] rounded-2xl">
              <div className="w-full">
                <h2 className="text-left text-black text-xl sm:text-3xl font-bold m-5">
                  How To Follow This Program?
                </h2>
              </div>
              <div className="flex flex-wrap justify-between gap-10 m-5">
                <div className="xl:w-fit w-full md:flex md:justify-center">
                  <img
                    src={programs[0].followingProgramImage}
                    alt="followProgram"
                    className="rounded-lg h-[350px] sm:h-[450px]"
                  />
                </div>
                <p className="text-left text-black text-lg font-normal xl:w-[50%] w-full">
                  {programs[0].followingProgram}
                </p>
              </div>
            </div>

            {/*onClick={() => doSomething()}*/}
            {(!userLoggedIn || !isSubscribed) && (
              <div className="priceButtonContainer flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-2 p-4 sm:p-6 w-full max-w-lg mx-auto">
              <span className="priceValue text-lg sm:text-xl font-bold">
                Price: ${program.price} AUD
              </span>
              <button
                type="submit"
                className={`m-auto place-self-center p-2 px-4 mb-4 text-white font-semibold rounded-full bg-[#525252] active:bg-[#6D6D6D] hover:bg-[#525252] hover:shadow-xl active:bg-[#3b3b3b]'}`}
                onClick={()=> navigate(`/checkout/${programID}`)}
              >
                Buy Now
              </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Program;
