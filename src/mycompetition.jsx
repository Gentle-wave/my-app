// import React from "react";

// const MyCompetitions = ({ userCompetitions, onDeleteCompetition }) => {
//   const userId = localStorage.getItem("userId");

//   return (
//     <div className="my-competitions">
//       <h2>My Competitions</h2>
//       <ul>
//         {userCompetitions && userCompetitions.length > 0 ? (
//           userCompetitions.map((competition) => (
//             <li key={competition.id}>
//               {competition.title}
//               <button onClick={() => onDeleteCompetition(competition.id)}>
//                 Delete
//               </button>
//             </li>
//           ))
//         ) : (
//           <p>No competitions created yet.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default MyCompetitions;

import React, { useState, useEffect } from "react";

const MyCompetitions = ({ onDeleteCompetition }) => {
  const userId = localStorage.getItem("userId");
  const [userCompetitions, setUserCompetitions] = useState([]);

  useEffect(() => {
    // Fetch the user's competitions when the component mounts
    fetch(`https://voting-system-bdvi.onrender.com/api/competitions/singleusercompetition/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserCompetitions(data.competitions);
      })
      .catch((error) => {
        console.error('Error fetching competitions:', error);
      });
  }, [userId]);

  const handleDeleteCompetition = (id) => {
    // Delete the competition and update the state if successful
    fetch(`https://voting-system-bdvi.onrender.com/api/competitions/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          // Successfully deleted, update the state
          setUserCompetitions(userCompetitions.filter((comp) => comp.id !== id));
        }
      })
      .catch((error) => {
        console.error('Error deleting competition:', error);
      });
  };

  return (
    <div className="my-competitions">
      <h2>My Competitions</h2>
      <ul>
        {userCompetitions && userCompetitions.length > 0 ? (
          userCompetitions.map((competition) => (
            <li key={competition.id}>
              {competition.title}
              <button onClick={() => handleDeleteCompetition(competition.id)}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No competitions created yet.</p>
        )}
      </ul>
    </div>
  );
};

export default MyCompetitions;
