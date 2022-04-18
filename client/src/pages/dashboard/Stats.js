import { useAppContext } from '../../context/appContext';
import { Loading } from '../../components';
import { useEffect } from 'react';

const Stats = () => {
   const { /* showStats, */ isLoading /* , monthlyApplications */ } =
      useAppContext();

   // fetcheo los stats y los meto en el state gral
   useEffect(() => {
      // showStats();
   }, []);

   if (isLoading) {
      return <Loading center />;
   }

   return (
      <>
         <h1>stats</h1>
         {/* <StatsContainer />
         {monthlyApplications.length > 0 && <ChartsContainer />} */}
      </>
   );
};

export default Stats;
