"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
var ProductService = /** @class */ (function () {
    function ProductService() {
    }
    ProductService.prototype.getBayNumericValue = function (bay) {
        var regex = /([A-Z\s]+)(\d+)/;
        // console.log(bay)
        var match = bay.match(regex);
        if (match) {
            var bayLetters = match[1], bayNumber = match[2];
            var base = 'A'.charCodeAt(0) - 1;
            var value = 0;
            //console.log("bayLetters:"+bayLetters)
            //console.log("bayNumber:"+bayNumber)
            for (var i = 0; i < bayLetters.length; i++) {
                var charValue = bayLetters[i].charCodeAt(0) - base;
                value = value * 26 + charValue;
            }
            return value * 100 + parseInt(bayNumber, 10);
        }
        return 0;
    };
    ProductService.prototype.sortProducts = function (products) {
        var _this = this;
        products.sort(function (a, b) {
            var _a = a.pick_location.split('-'), aBay = _a[0], aShelf = _a[1];
            var _b = b.pick_location.split('-'), bBay = _b[0], bShelf = _b[1];
            var aBayNumeric = _this.getBayNumericValue(aBay);
            var bBayNumeric = _this.getBayNumericValue(bBay);
            if (aBayNumeric !== bBayNumeric) {
                return aBayNumeric - bBayNumeric;
            }
            var aShelfNumber = aShelf ? parseInt(aShelf.slice(1), 10) : 0;
            var bShelfNumber = bShelf ? parseInt(bShelf.slice(1), 10) : 0;
            if (aShelfNumber !== bShelfNumber) {
                return aShelfNumber - bShelfNumber;
            }
            var aBayLetter = aBay[0];
            var bBayLetter = bBay[0];
            if (aBayLetter !== bBayLetter) {
                return aBayLetter.localeCompare(bBayLetter);
            }
            var aProductCodeNumeric = parseInt(a.product_code.slice(-3), 10);
            var bProductCodeNumeric = parseInt(b.product_code.slice(-3), 10);
            return aProductCodeNumeric - bProductCodeNumeric;
        });
        return products;
    };
    ProductService.prototype.parseCSVData = function (csvData) {
        var lines = csvData.split('\n');
        var headers = lines[0].split(',');
        var products = [];
        for (var i = 1; i < lines.length; i++) {
            var values = lines[i].split(',');
            if (values.length === headers.length) {
                var product = {
                    product_code: values[0],
                    quantity: parseInt(values[1], 10),
                    pick_location: values[2]
                };
                products.push(product);
            }
        }
        return products;
    };
    ProductService.prototype.convertToCSVData = function (products) {
        var csvData = 'product_code,quantity,pick_location\n';
        for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
            var product = products_1[_i];
            var product_code = product.product_code, quantity = product.quantity, pick_location = product.pick_location;
            csvData += "".concat(product_code, ",").concat(quantity, ",").concat(pick_location, "\n");
        }
        return csvData;
    };
    return ProductService;
}());
exports.ProductService = ProductService;
