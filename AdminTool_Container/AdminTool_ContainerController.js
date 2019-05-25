({
	init : function(component, event, helper) {
        const serverAction = component.find('serverAction');
        serverAction.callServer(
            component.get('c.getUserData'),
            null,
            $A.getCallback(wrappedData => { // Success callback
                wrappedData.forEach(dataWrap => {
                	if(dataWrap.sObjtName === 'User'){
                		
                    } else if (dataWrap.sObjtName === 'Profile'){
                        
                    }
            	});
            }),
            $A.getCallback(errors => { // Error callback
                // In this example, we only display the first error message because we triggered the error ourself
                // In all other use cases make sure to display ALL error message or leave the default error handling do it
                component.set('v.response', errors[0].message);
            }),
            false, true, true, true
        );
		
	}
})