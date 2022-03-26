pragma solidity ^0.5.13;


/**
 * @title StockRoomInterface
 * @notice Interface for StockRoom contract
 */
interface StockRoomInterface {

    // @notice Set the address of the FiatContract contract
    function setFiatContractAddress(address _address) external;

    // @notice Create a Shop
    function createShop(
        string calldata _name,
        string calldata _desc,
        string calldata _fiat
    ) external returns (uint256);

    // @notice Create a SKU for a Shop
    function createSKU(
        uint256 _shopId,
        uint256 _skuTypeId,
        uint256 _price,
        string calldata _name,
        string calldata _desc,
        bool _consumable,
        bool _limited,
        uint256 _limit
    ) external returns(uint256);

    // @notice Create a SKU Type for a Shop
    function createSKUType(
        uint256 _shopId,
        string calldata _name,
        string calldata _desc
    ) external returns(uint256);

    // @notice get an SKU's price in Ether
    function getPriceInEther(uint256 _skuId) external view returns (uint256);

    // @notice convert an Ether amount to a Shop's fiat currency
    function convertEtherToShopFiat(uint256 _shopId, uint256 _amount) external view returns (uint256);

    // @notice convert an Ether amount to the Franchise's fiat currency
    function convertEtherToFranchiseFiat(uint256 _amount) external view returns (uint256);

    // @notice confirm this is a StockRoom contract
    function isStockRoom() external pure returns (bool);

    // @notice confirm whether an item can be minted based on limit and current item count
    function canMintItem(uint256 _skuId, uint256 _itemCount) external view returns (bool);

    // @notice Get a SKU's properties by ID
    function getSKU(uint256 _skuId) external view returns (uint256, uint256, uint256, uint256, string memory, string memory, bool, bool, uint256);

    // @notice Get the list of SKU Ids associated with a given SKUType
    function getSKUTypeSKUIds(uint256 _skuTypeId) external view returns (uint[] memory);

    // @notice Get the list of SKU Ids associated with a given Shop
    function getSKUIds(uint256 _shopId) external view returns (uint[] memory);

    // @notice Get the list of SKU Type Ids associated with a given Shop
    function getSKUTypeIds(uint256 _shopId) external view returns (uint[] memory);

    // @notice Get a SKUType's properties by ID
    function getSKUType(uint256 _skuTypeId) external view returns (uint256, uint256, string memory, string memory);

    // @notice Get the list of Shop Ids associated with a given Owner
    function getShopIds(address _owner) external view returns (uint[] memory);

    // @notice Get a Shop's properties by ID
    function getShop(uint256 _shopId) external view returns (address, uint256, string memory, string memory, string memory);

    // @notice Get a Shop's owner
    function getShopOwner(uint256 _shopId) external view returns (address);

}