import styled from 'styled-components';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import { useDeleteCabin } from './useDeleteCabin';
import { useCreateCabin } from './useCreateCabin';

import { formatCurrency } from '../../utils/helpers';

import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Img = styled.img`
  display: block;
  width: 4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating: isDuplicating, createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;

  const handleDuplicateCabin = function () {
    createCabin({
      name: `Copy of ${cabin.name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  };

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button
                onClick={handleDuplicateCabin}
                icon={<HiSquare2Stack />}
                disabled={isDuplicating}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens='cabin-edit'>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens='delete-cabin'>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name='cabin-edit'>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name='delete-cabin'>
              <ConfirmDelete
                resourceName={name}
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
