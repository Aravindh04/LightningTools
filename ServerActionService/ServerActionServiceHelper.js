({
    handleErrors : function(params, errors) {
        const helper = this;
        // Display error if applicable
        if (params.disableErrorNotification === true) {
            return;
        }
        
        // Retrieve and display the error message(s) sent by the server
        let isUnknownError = true;
        if (typeof errors !== 'undefined' && Array.isArray(errors) && errors.length > 0) {
            errors.forEach(error => {
                // Check for 'regular' errors
                if (typeof error.message !== 'undefined') {
                    helper.displayError(error.message, params);
                    isUnknownError = false;
                }
                // Check for 'pageError' errors
                const pageErrors = error.pageErrors;
                if (typeof pageErrors !== 'undefined' && Array.isArray(pageErrors) && pageErrors.length > 0) {
                    pageErrors.forEach(pageError => {
                        if (typeof pageError.message !== 'undefined') {
                            helper.displayError(pageError.message, params);
                            isUnknownError = false;
                        }
                    });
                }
            });
        }
        // Make sure that we display at least one error message
        if (isUnknownError) {
            this.displayError('Unknown error', params);
        }
        // Display raw error stack in console
        console.error(JSON.stringify(errors));
    },

    displayError : function(errorMessage, actionParams) {
        // Display error in console
        console.error('Server Error: ', errorMessage);
        console.error('Action: ', actionParams.action.getName(), ' Params: ', actionParams.params);
        // Fire error toast if available
        this.showToastMessage(errorMessage,'Server Error','error');
    },

    showToastMessage : function(toastMessage,toastType,toastTitle,toastMode,toastDuration){
        console.log('In toast message');
        toastMode = ( 'undefined' !== toastMode && null !== toastMode)      ? toastMode     : 'sticky';
        toastType = ( 'undefined' !== toastType && null !== toastType)      ? toastType     : 'info';
        toastTitle = ( 'undefined' !== toastTitle && null !== toastTitle)    ? toastTitle    : 'Information';
        const toastEvent = $A.get("e.force:showToast");
        toastDuration = this.isNotBlank(toastDuration) ? toastDuration : 3000;
            
		if ('undefined' !== typeof toastEvent) {
            toastEvent.setParams({
                title : toastTitle,
                message : toastMessage,
                type : toastType,
                mode: toastMode
            });
            
            toastEvent.fire().then((res) => {
                console.log(res);
            }).catch((error) => {
                console.error('Error cause is:', error);
            });
        }else{
            alert(toastType+'! '+toastMessage);
        }
    },
        
    isNotBlank : function(checkString) {
        return ('' !=  checkString && 
                null != checkString &&
                !$A.util.isEmpty(checkString) && 
                !$A.util.isUndefined(checkString)
               );
    },
        
	isNotNull : function(checkString) {
        return (null != checkString &&
                !$A.util.isEmpty(checkString) && 
                !$A.util.isUndefined(checkString)
               );
    },
})