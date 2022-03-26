import {
    CREATING_SKU,
//    IDS_REQUESTED,
//    SKU_REQUESTED
} from './ItemActions';

import {
    ACCOUNT_SELECTED
} from "../account/AccountActions";

const INITIAL_STATE = {
    newSKU: {
        skuId: null,
        skuName: null,
        creatingSKU: false
    },
    skuIds:[]
};

function itemReducer(state=INITIAL_STATE, action) {
    let reduced;
    switch (action.type)
    {
        case ACCOUNT_SELECTED:
            reduced = INITIAL_STATE;
            break;

        case CREATING_SKU:
            reduced = {
                ...state,
                newSKU: {
                    creatingSKU: action.creatingSKU,
                    skuName: action.skuName
                }
            };
            break;


        default:
            reduced = state;
    }
    return reduced;
}

export default itemReducer;