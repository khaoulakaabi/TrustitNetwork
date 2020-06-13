export const utils = {
    getDateFromISOString(isoStringDate) {
        let date = new Date(isoStringDate);
        return date.getDate()+' - ' + (date.getMonth()+1) + ' - '+date.getFullYear();
    },
    isAdmin(auth) {
        let test = false;
        if(auth.isAuthenticated) {
            if(auth.user.role==="admin") test = true;
        };
        return test;
    },
    isUserPresidentOfClub(club, auth) {
        let test = false;
        if(auth.isAuthenticated && Array.isArray(club.presidents)) {
            club.presidents.forEach(president => {
                if(president._id === auth.user._id) test = true;
            });
        };
        return test;
    },
    isUserProjectOwnerInClub(club, auth) {
        let test = false;
        if(auth.isAuthenticated && Array.isArray(club.projectOwners)) {
            club.projectOwners.forEach(owner => {
                if(owner._id === auth.user._id) test = true;
            });
        };
        return test;
    },
    isUserOwnerOfProject(project, auth) {
        let test = false;
        if(auth.isAuthenticated) {
            if(project.owner._id === auth.user._id) {
              test = true;
            }
        };
        return test;
    }
}