sap.ui.define([
    "sap/base/Log"
], function (Log) {
    "use strict";
    return {
        _fnRead: function(sUrl,httpMethod,oParameters,headerRequest,successCallBackFn,errorCallBackFn){
            try {
                oParameters = this._fnCheckForParameters(oParameters);
                $.ajax({
                    headers:headerRequest,
                    type: httpMethod,
                    url : sUrl,
                    error: function(hrex) {
                        // this.sessionTimeOutCheck(hrex);
                        return errorCallBackFn(hrex);
                    }.bind(this), //oParameters.error.bind(this),
                    success: function(data, textStatus, xhr) {
                        return successCallBackFn(data, textStatus, xhr);
                    }.bind(this)
                });
            } catch (e) {
                Log.error("Exception in fnRead function");
            }
        },
        _fnPost:function(sUrl,httpMethod,oRequestPayload,callbackFn){
            try {
                try {
                    $.ajax({
                        type: httpMethod,
                        url : sUrl,
                        data:JSON.stringify(oRequestPayload),
                        dataType : 'json',
                        contentType : "application/json",
                        error: function(hrex) {
                            // this.sessionTimeOutCheck(hrex);
                            callbackFn(hrex);
                        }.bind(this), //oParameters.error.bind(this),
                        success: function(response,oData) {
                            callbackFn(response,oData);
                        }.bind(this)
                    });
                } catch (e) {
                    Log.error("Exception in fnRead function");
                }
            } catch (e) {
                Log.error("Exception in _fnPostData function");
            }
        },
        
        _fnCheckForParameters: function(oParameters) {
            try {
                var isQueryParam = false;
                if (!oParameters) {
                    oParameters = {};
                }
                if (!oParameters.success) {
                    oParameters.success = function() {};
                }
                if (!oParameters.error) {
                    oParameters.error = function() {};
                }
                if (oParameters.filter) {
                    isQueryParam = true;
                }
                if (oParameters.expand) {
                    isQueryParam = true;
                }
                if (!oParameters.queryParam) {
                    oParameters.queryParam = "";
                }

                if (isQueryParam) {
                    oParameters.queryParam = "?";
                    oParameters.queryParam = oParameters.queryParam + (oParameters.expand === undefined ? "" : "$expand=" + oParameters.expand);
                    oParameters.queryParam = oParameters.queryParam + (oParameters.filter === undefined ? "" : "" + oParameters.filter);

                }
                if (!isQueryParam) {
                    // oParameters.queryParam = "?";
                    

                }
                return oParameters;
            } catch (e) {
                Log.error("Exception in fnCheckForParameters function");
            }
        }
    }
});