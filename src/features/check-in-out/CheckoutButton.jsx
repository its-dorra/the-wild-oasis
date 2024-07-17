import Button from '../../ui/Button';
import { useCheckOut } from './useCheckout';

function CheckoutButton({ bookingId }) {
  const { checkingOut, isCheckingOut } = useCheckOut();

  return (
    <Button
      $variation='primary'
      size='small'
      disabled={isCheckingOut}
      onClick={() => checkingOut(bookingId)}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
