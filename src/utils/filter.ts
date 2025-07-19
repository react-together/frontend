import { ImageElement } from "../components/ImageCard";
import { ConnectOprtator, FilterItem, FilterKey } from "../types/FilterItem";
import intersection from "./intersection";
import union from "./union";

const myFilter = (arr: ImageElement[], filters: FilterItem[], parentId: number) => {
  let prevArr = arr

  console.log(filters
    .filter((item) => item.parentId === parentId));
  filters
    .filter((item) => item.parentId === parentId)
    .forEach((filter) => {
      let filteredArr = arr;
      switch (filter.label) {
        case FilterKey.GROUP:
          filteredArr = myFilter(arr, filters, filter.id);
          break;
        case FilterKey.REACTIONS:
          filteredArr = arr.filter((item) => {
            if (filter.values.length === 0) return true;
            return filter.values.some((value) => {
              if (value === '正向') {
                return item.reaction?.isRecommended === 1;
              } else if (value === '負向') {
                return item.reaction?.isRecommended === 0;
              }
              return false;
            });
          })
          break;
        case FilterKey.AUTHORS:
          filteredArr = arr.filter((item) => {
            if (filter.values.length === 0) return true;
            return filter.values.some((value) => {
              return item.author?.includes(value);
            });
          })
          break;
        case FilterKey.CATEGORIES:
          filteredArr = arr.filter((item) => {
            if (filter.values.length === 0) return true;
            return filter.values.some((value) => {
              return item.categories?.includes(value);
            });
          })
          break;
      }
      const arrIds = prevArr.map((item) => item.id);
      const filteredIds = filteredArr.map((item) => item.id);
      let result: number[] = [];
      switch (filter.connect) {
        case ConnectOprtator.AND:
          result = intersection(arrIds, filteredIds);
          break;
        case ConnectOprtator.OR:
          result = union(arrIds, filteredIds);
          break;
      }
      console.log(result);
      prevArr = arr.filter((item) => result.includes(item.id));
    });
  return prevArr;
}

export default myFilter;