export const initialState = {
  title: '',
  listCategoryId: [],
  price: [],
  rams: [],
  roms: [],
  services: [],
  page: 1,
  sort: [
    {
      type: 'firtWord',
      order: '',
    },
    {
      type: 'sale',
      order: '',
    },
    {
      type: 'updatedAt',
      order: 'desc',
    },
  ],
};

export default function filterReducer(state, action) {
  switch (action.type) {
    case 'add_category':
      return {
        ...state,
        listCategoryId: [...state.listCategoryId, action.payload],
        page: 1,
      };

    case 'delete_category':
      return {
        ...state,
        listCategoryId: state.listCategoryId.filter((e) => e !== action.payload),
        page: 1,
      };

    case 'add_ram':
      return {
        ...state,
        rams: [...state.rams, action.payload],
        page: 1,
      };

    case 'delete_ram':
      return {
        ...state,
        rams: state.rams.filter((e) => e !== action.payload),
        page: 1,
      };

    case 'add_rom':
      return {
        ...state,
        roms: [...state.roms, action.payload],
        page: 1,
      };

    case 'delete_rom':
      return {
        ...state,
        roms: state.roms.filter((e) => e !== action.payload),
        page: 1,
      };

    case 'add_service':
      return {
        ...state,
        services: [...state.services, action.payload],
        page: 1,
      };

    case 'delete_service':
      return {
        ...state,
        services: state.services.filter((e) => e !== action.payload),
        page: 1,
      };

    case 'change_price':
      return {
        ...state,
        price: action.payload,
        page: 1,
      };

    case 'change_title':
      if (state.title !== action.payload)
        return {
          ...state,
          title: action.payload,
          page: 1,
        };

      return state;

    case 'clear_title':
      return {
        ...state,
        title: '',
        page: 1,
      };

    case 'clear_filter':
      return {
        ...initialState,
      };

    case 'change_page':
      return {
        ...state,
        page: action.payload,
      };

    case 'change_sort':
      return {
        ...state,
        sort: state.sort.map((element) => {
          const sortItem = { ...element };
          if (sortItem.type === action.payload.type) {
            sortItem.order = action.payload.order;
          }
          return sortItem;
        }),
        page: 1,
      };

    default:
      return state;
  }
}
