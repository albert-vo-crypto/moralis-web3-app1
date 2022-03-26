// Service functions
import { fetchShopIds, fetchShops, createShop, fetchShopBalance, withdrawShopBalance } from '../../services/ShopService';
import { Shop } from '../../domain';


// Shop related actions
export const IDS_REQUESTED       = 'shop/ids-requested';
export const IDS_FETCHED         = 'shop/ids-fetched';
export const SHOPS_REQUESTED     = 'shop/items-requested';
export const SHOPS_FETCHED       = 'shop/items-fetched';
export const SHOP_SELECTED       = 'shop/selected';
export const NAME_CHANGED        = 'shop/name-changed';
export const FIAT_CHANGED        = 'shop/fiat-changed';
export const DESC_CHANGED        = 'shop/description-changed';
export const CREATING_SHOP       = 'shop/creating';
export const SHOP_CREATED        = 'shop/created';
export const BALANCE_REQUESTED   = 'shop/balance-requested';
export const BALANCE_FETCHED     = 'shop/balance-fetched';
export const BALANCE_WITHDRAWING = 'shop/balance-withdrawing';
export const BALANCE_WITHDRAWN   = 'shop/balance-withdrawn';

export const getShops = (contract, owner) => {

    return async function(dispatch) {

        dispatch({
            type: IDS_REQUESTED,
            fetchingIds: true,
            idsFetched: false
        });

        // Get the shop ids
        const ids = await fetchShopIds(contract, owner);

        dispatch({
            type: IDS_FETCHED,
            fetchingIds: false,
            idsFetched: true,
            ids
        });

        // Fetch the shops
        let shops;
        if (ids && ids.length) {

            dispatch({
                type: SHOPS_REQUESTED,
                fetchingShops: true,
                shopsFetched: false
            });

            shops = await fetchShops(contract, ids);
        }

        dispatch({
            type: SHOPS_FETCHED,
            fetchingShops: false,
            shopsFetched: true,
            shops
        });

    }
};

export const selectShop = shopId => {

    return {
        type: SHOP_SELECTED,
        selectedShopId: shopId
    };

};

export const createNewShop = (contract, owner, name, description, fiat) => {

    return async function(dispatch) {

        dispatch({
            type: CREATING_SHOP,
            creatingShop: true,
            owner,
            name,
            description,
            fiat
        });

        createShop(contract, owner, name, description, fiat, event => {

            const shopId = event.returnValues[1];
            const shop = new Shop(owner, shopId, name, description, fiat);

            dispatch({
                type: SHOP_CREATED,
                shop,
                creatingShop: false
            });

            dispatch(selectShop(shop.shopId));
        } );

    };

};

export const getShopBalance = (contract, owner, shopId) => {

    return async function(dispatch) {

        dispatch({
            type: BALANCE_REQUESTED,
            fetchingShopBalance: true,
            shopBalanceFetched: false,
        });

        const selectedShopBalance = await fetchShopBalance(contract, owner, shopId);

        dispatch({
            type: BALANCE_FETCHED,
            selectedShopBalance,
            fetchingShopBalance: false,
            shopBalanceFetched: true
        });

    };

};

export const nameChanged = name => {

    return {
        type: NAME_CHANGED,
        name
    };

};

export const descChanged = description => {

    return {
        type: DESC_CHANGED,
        description
    };

};

export const fiatChanged = fiat => {

    return {
        type: FIAT_CHANGED,
        fiat
    };

};

export const transferShopBalance = (contract, owner, shopId) => {

    return async function(dispatch) {

        dispatch({
            type: BALANCE_WITHDRAWING,
            withdrawingBalance: true,
            balanceWithdrawn: true
        });

        withdrawShopBalance(contract, owner, shopId, event => {

            dispatch({
                type: BALANCE_WITHDRAWN,
                withdrawingBalance: false,
                balanceWithdrawn: true
            });

            dispatch(getShopBalance(contract, owner, shopId));

        } );

    };

};