import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourceName='cabins' />;

  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;

  // 1) filtering

  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount);
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => !cabin.discount);

  // 2) sorting

  const sortBy = searchParams.get('sortBy') || 'name-asc';

  const [field, direction] = sortBy.split('-');

  const modifier = direction == 'asc' ? 1 : -1;

  const sortedCabins = filteredCabins.sort((a, b) => {
    return (a[field] - b[field]) * modifier;
  });

  return (
    <Menus>
      <Table $columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
