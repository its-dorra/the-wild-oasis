import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';

export const useTodayActivity = function () {
  const { data: activities, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['today-activity'],
  });

  return { activities, isLoading };
};
