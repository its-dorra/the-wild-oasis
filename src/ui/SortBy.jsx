import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || '';

  const handleChange = function (e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select
      options={options}
      value={sortBy}
      type='white'
      onChange={handleChange}
    />
  );
}

export default SortBy;
