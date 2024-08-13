import { fetchCourseDetail, fetchCourseDetailById, fetchUserSubscribedCourses } from "@services/apiService";
import { Course, CourseDetail } from "@services/interfaces";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import ProgramWeekNav from "../../components/programWeeksNav/index";
import { useAuth } from "../../contexts/authContext";

const Program: React.FC = () => {
  // const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { userLoggedIn } = useAuth();

  const programID = useParams().name;
  const [program, setProgram] = useState<Course | null>(null);
  const [programDetails, setProgramDetails] = useState<CourseDetail[]>([]);

  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProgramDetails = async () => {
      try {
        const getProgramDetails = await fetchCourseDetailById( programID + "");
        if(!getProgramDetails) {
          // navigate(`/programs/${programID}`);
        }
        else{
          setProgramDetails(getProgramDetails);
        }
      } catch (error) {
        // Handle errors, e.g., network errors
        console.error("Error fetching program details:", error);
        navigate(`/programs/${programID}`);
      }
    };

    getProgramDetails();
  }, [programID, navigate]);

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
    return <p className="mt-10">Loading...</p>; // Show a loading state while fetching data
  }

  if (error) {
    return <p className="mt-10">{error}</p>; // Show an error message if there was an issue
  }

  return (
    <div className="p-0 m-0">
      <div className="flex flex-col h-full px-[5%] md:px-[10%] font-serif">
        <div className="border-b-2 px-[2%]">
          <h1 className="text-left text-black text-xl md:text-2xl lg:text-3xl font-bold m-5 pt-10">
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
            {programDetails.map((detail, index) => (
              <div key={index} className="flex flex-col p-5 m-5 bg-[#FAFAF5] border border-[#E6E6E6] rounded-2xl">
                <div className="w-full">
                  <h2 className="text-left text-black text-xl sm:text-3xl font-bold m-5">
                    {detail.question}
                  </h2>
                </div>
                <div className="flex flex-wrap justify-between gap-10 m-5">
                  <p className="text-left text-black text-lg font-normal xl:w-[50%] w-full">
                    {detail.detail}
                  </p>
                  <div className="xl:w-fit w-full md:flex md:justify-center object-cover">
                    <img
                      src={detail.image_url}
                      alt={detail.question}
                      className="rounded-lg h-[350px] sm:h-[450px]"
                    />
                  </div>
                </div>
              </div>
            ))}

            {!userLoggedIn || !isSubscribed ? (
              <div className="priceButtonContainer flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-2 p-4 sm:p-6 w-full max-w-lg mx-auto">
                <span className="priceValue text-lg sm:text-xl font-bold">
                  Price: ${program.price} AUD
                </span>
                <button
                  type="submit"
                  className="m-auto place-self-center p-2 px-4 text-white font-semibold rounded-full bg-[#525252] active:bg-[#6D6D6D] hover:bg-[#525252] hover:shadow-xl active:bg-[#3b3b3b]"
                  onClick={() => navigate(`/checkout/${programID}`)}
                >
                  Buy Now
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default Program;
