import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CompetitionResults = () => {
  const { competitionId } = useParams();
  const [voteData, setVoteData] = useState(null);

  useEffect(() => {
    // Make an API request to get competition vote data
    fetch(`https://voting-system-bdvi.onrender.com/api/competitions/${competitionId}/voters`)
      .then((response) => response.json())
      .then((data) => setVoteData(data))
      .catch((error) => console.error('Error fetching competition vote data:', error));
  }, [competitionId]);

  if (voteData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Competition Results</h2>
      <p>Vote Count: {voteData.voterCount}</p>
      <div>
        <h3>Votes:</h3>
        <ul>
          {voteData.voters.map((voter, index) => (
            <li key={index}>{voter.voteesName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompetitionResults;
