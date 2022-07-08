import { isNotEmptyString } from '@rnw-community/shared';
import { useCallback, useEffect, useState } from 'react';

export const useListSearch = <T extends { name: string }>(searchValue: string, data: T[]) => {
  const [filteredList, setFilteredList] = useState(data);

  const networksFiltering = useCallback(() => {
    if (isNotEmptyString(searchValue)) {
      const filtered = data.filter((element: T) => element.name.toLowerCase().includes(searchValue.toLowerCase()));

      if (isNotEmptyString(searchValue)) {
        return setFilteredList(filtered);
      }
    }

    return setFilteredList(data);
  }, [data, searchValue]);

  useEffect(() => {
    networksFiltering();
  }, [searchValue, networksFiltering]);

  return filteredList;
};
