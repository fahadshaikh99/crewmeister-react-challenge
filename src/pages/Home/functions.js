export const createMembersObjectByUserId = (membersList) => {
    const userObject = membersList?.reduce((acc, curr) => {
        acc[curr.userId] = curr;
        return acc;
    }, {});
    return userObject
}

export const createAbsencesListWithMembers = (absences, membersObject) => {
    const absenceList = absences?.payload?.map(obj => ({
        name: membersObject[obj.userId]?.name,
        status: obj?.confirmedAt ? 'confirmed' : obj?.rejectedAt ? 'rejected' : 'requested',
        // period: `${obj?.startDate} to ${obj.endDate}`,
        period: `${daysDiff(obj?.startDate, obj.endDate)} days`,
        ...obj
    }));
    return absenceList
}

function daysDiff(dt1, dt2) {
    var startDate = new Date(dt1)
    var endDate = new Date(dt2)
    var diffTime = (endDate.getTime() - startDate.getTime());
    var daysDiff = diffTime / (1000 * 3600 * 24);
    return daysDiff;

}