import { useCallback, useEffect, useState } from 'react';

export const useListSearch = <T extends { name: string }>(searchValue: string, data: T[]) => {
  const [filteredList, setFilteredList] = useState(data);

  const listFiltering = useCallback(() => {
    const list = data.filter((element: T) => element.name.toLowerCase().includes(searchValue.toLowerCase()));

    setFilteredList(list);
  }, [data, searchValue]);

  useEffect(() => {
    listFiltering();
  }, [searchValue, listFiltering]);

  return filteredList;
};
