// import React from "react";

// const MyCompetitions = ({ userCompetitions, onDeleteCompetition }) => {
//   return (
//     <div className="my-competitions">
//       <h2>My Competitions</h2>
//       <ul>
//         {userCompetitions.map((competition) => (
//           <li key={competition.id}>
//             {competition.title}
//             <button onClick={() => onDeleteCompetition(competition.id)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyCompetitions
import React from "react";

const MyCompetitions = ({ userCompetitions, onDeleteCompetition }) => {
  return (
    <div className="my-competitions">
      <h2>My Competitions</h2>
      <ul>
        {userCompetitions && userCompetitions.length > 0 ? (
          userCompetitions.map((competition) => (
            <li key={competition.id}>
              {competition.title}
              <button onClick={() => onDeleteCompetition(competition.id)}>
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
