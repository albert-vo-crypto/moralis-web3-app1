import {
    IDS_REQUESTED,
    IDS_FETCHED,
    SKU_TYPES_REQUESTED,
    SKU_TYPES_FETCHED,
    TOGGLE_FORM,
    NAME_CHANGED,
    DESC_CHANGED,
    CREATING_SKU_TYPE,
    SKU_TYPE_CREATED,
    SKU_TYPE_SELECTED
} from './SKUTypeActions';

import { ACCOUNT_SELECTED } from "../account/AccountActions";
import { SHOP_SELECTED } from "../shop/ShopActions";

const INITIAL_STATE = {
    newSKUType: {
        shopId: null,
        skuTypeId: null,
        name: "",
        description: ""
    },
    skuTypeFormDisplayed: false,
    creatingSKUType: false,

    fetchingIds: false,
    idsFetched: false,
    ids:[],

    fetchingSKUTypes: false,
    skuTypesFetched: false,
    skuTypes: [],

    selectedSKUTypeId: null
};

function SKUTypeReducer(state=INITIAL_STATE, action) {
    let reduced;
    switch (action.type)
    {
        case ACCOUNT_SELECTED:
        case SHOP_SELECTED:
            reduced = INITIAL_STATE;
            break;

        case SKU_TYPE_SELECTED:
            reduced = {
                ...state,
                selectedSKUTypeId: action.selectedSKUTypeId
            };
            break;

        case IDS_REQUESTED:
            reduced = {
                ...state,
                fetchingIds: action.fetchingIds,
                idsFetched: action.idsFetched
            };
            break;

        case IDS_FETCHED:
            reduced = {
                ...state,
                fetchingIds: action.fetchingIds,
                idsFetched: action.idsFetched,
                ids: action.ids
            };
            break;

        case SKU_TYPES_REQUESTED:
            reduced = {
                ...state,
                fetchingSKUTypes: action.fetchingSKUTypes,
                skuTypesFetched: action.skuTypesFetched,
            };
            break;

        case SKU_TYPES_FETCHED:
            reduced = {
                ...state,
                fetchingSKUTypes: action.fetchingSKUTypes,
                skuTypesFetched: action.skuTypesFetched,
                skuTypes: action.skuTypes
            };
            break;

        case TOGGLE_FORM:
            reduced = {
                ...state,
                skuTypeFormDisplayed: !state.skuTypeFormDisplayed,
                newSKUType: INITIAL_STATE.newSKUType
            };
            break;

        case NAME_CHANGED:
            reduced = {
                ...state,
                newSKUType: {
                    ...state.newSKUType,
                    name: action.name,
                }
            };
            break;

        case DESC_CHANGED:
            reduced = {
                ...state,
                newSKUType: {
                    ...state.newSKUType,
                    description: action.description,
                }
            };
            break;

        case CREATING_SKU_TYPE:
            reduced = {
                ...state,
                creatingSKUType: action.creatingSKUType
            };
            break;

        case SKU_TYPE_CREATED:
            reduced = {
                ...state,
                ids: state.ids.concat([action.skuType.skuTypeId]),
                skuTypes: state.skuTypes.concat([action.skuType]),
                creatingSKUType: action.creatingSKUType,
                newSKUType: INITIAL_STATE.newSKUType,
                skuTypeFormDisplayed: action.skuTypeFormDisplayed
            };
            break;

        default:
            reduced = state;
    }
    return reduced;
}

export default SKUTypeReducer;