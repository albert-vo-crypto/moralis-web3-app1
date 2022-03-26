import React, {Component} from "react";
import {connect} from "react-redux";

import CategoryList from "./CategoryList";
import CategoryForm from "./CategoryForm";
import {
    AppSlidingPanel,
    KitPanelHeading,
    KitPanelTitle,
    KitPanelBody,
    KitButton
} from "./theme";
import {toggleTypeForm, createNewSKUType, nameChanged, descChanged} from "../store/sku_type/SKUTypeActions";

class ShopView extends Component {

    // Render the Shop panel
    render() {

        const {
            shop,
            toggleTypeForm,
            skuTypeFormDisplayed,
            skuFormDisplayed,
            skuTypesFetched
        } = this.props;

        return  <AppSlidingPanel>
                    <KitPanelHeading>
                        <KitPanelTitle>
                            {shop.name}
                            <div className="pull-right">
                            {!skuTypesFetched || skuTypeFormDisplayed || skuFormDisplayed
                                ? null
                                : <KitButton onClick={toggleTypeForm}>Add Category</KitButton>}
                            </div>
                        </KitPanelTitle>
                        {shop.description}
                    </KitPanelHeading>
                    <KitPanelBody>
                        <CategoryList {...this.props}/>
                        {skuTypeFormDisplayed ? <CategoryForm {...this.props}/> : null}
                    </KitPanelBody>
                </AppSlidingPanel>;
    }
}

const mapStateToProps = (state) => ({
    selectedAccount: state.accountState.selectedAccount,
    selectedShopId: state.shopState.selectedShopId,
    selectedSKUTypeId: state.skuTypeState.selectedSKUTypeId,
    shops: state.shopState.shops,
    shop: state.shopState.shops.find(shop => shop.shopId === state.shopState.selectedShopId),
    skuTypes: state.skuTypeState.skuTypes,
    skuType: state.shopState.shops.find(skuType => skuType.skuTypeId === state.shopState.selectedSKUTypeId),
    skuTypesFetched: state.skuTypeState.skuTypesFetched,
    creatingSKUType: state.skuTypeState.creatingSKUType,
    skuTypeFormDisplayed: state.skuTypeState.skuTypeFormDisplayed,
    skuFormDisplayed: state.skuState.skuFormDisplayed,
    name: state.skuTypeState.newSKUType.name,
    description: state.skuTypeState.newSKUType.description,
    selectedShopBalance: state.shopState.selectedShopBalance,
    shopBalanceFetched: state.shopState.shopBalanceFetched,
    fetchingShopBalance: state.shopState.fetchingShopBalance
});

const mapDispatchToProps = (dispatch) => ({
    createNewSKUType: (contract, owner, shopId, name, description) => dispatch(createNewSKUType(contract, owner, shopId, name, description)),
    toggleTypeForm: () => dispatch(toggleTypeForm()),
    nameChanged: name => {dispatch(nameChanged(name))},
    descChanged: description => {dispatch(descChanged(description))},
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopView);