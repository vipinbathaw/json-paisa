import Overview from './Overview';
import PopularTags from './Reports/PopularTags';

const Reports = (props) => {
  return (
    <div className="home">
      <Overview data={props.data} />
      <PopularTags data={props.data} />
    </div>
  );
};

export default Reports;
