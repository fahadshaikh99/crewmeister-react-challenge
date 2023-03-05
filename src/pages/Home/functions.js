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
        period: `${obj?.startDate} to ${obj.endDate}`,
        ...obj
    }));
    return absenceList
}