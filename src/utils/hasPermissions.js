const hasPermissions = ({
    allowedPermissions = [],
    userPermissions = []
}) => {
    for (let i = 0; i < userPermissions.length; i++) {
        if (allowedPermissions.indexOf(userPermissions[i]) !== -1) {
            return true;
        }
    }
    return false;
}