import {HalProperty, HalResource} from 'hal-rest-client';
import {CouponModel} from './coupon.model';

export class CouponsList extends HalResource {
    @HalProperty('item', CouponModel) public items?: CouponModel[];
    @HalProperty(CouponsList) public first?: CouponsList;
    @HalProperty(CouponsList) public last?: CouponsList;
    @HalProperty(CouponsList) public prev?: CouponsList;
    @HalProperty(CouponsList) public next?: CouponsList;
    @HalProperty() public totalItems: number;
    @HalProperty() public itemsPerPage: number;
}
