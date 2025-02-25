import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { RunSummary } from '../components/run/summary';

const GET_ALL_RUNS = gql`
  {
    runs {
      runId
      meta {
        ciBuildId
        projectId
        commit {
          branch
          remoteOrigin
          message
          authorEmail
          authorName
        }
      }
      specs {
        spec
        instanceId
        claimed
      }
    }
  }
`;

export function RunsView() {
  const { loading, error, data } = useQuery(GET_ALL_RUNS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.runs.map(run => (
    <div key={run.runId}>
      <RunSummary run={run} />
    </div>
  ));
}
