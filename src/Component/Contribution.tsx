import Team from '../Component/Team'
import Data from '../Component/TeamData'
const ContributionComponent = () => {
    const contribution = Array.isArray(Data) ? Data.map((contribution: any, index: number) => {
      return (
        <Team 
          key={index}
          {...contribution}
        />
      );
    }) : null;
  
    return (
      <div>
        <div className='container'>
          <h1 className='text-[#1e293b] text-4xl font-bold heading'>Meet The Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contribution}
      </div>
      </div>
      </div>
    );
  };
  export default ContributionComponent