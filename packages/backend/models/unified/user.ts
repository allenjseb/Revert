export interface UnifiedUser {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    id: string;
    remoteId: string;
    createdTimestamp: Date;
    updatedTimestamp: Date;
    associations?: any; // TODO: Support associations
    additional: any;
}

export function unifyUser(user: any): UnifiedUser {
    const unifiedUser: UnifiedUser = {
        remoteId: user.id || user.Id,
        id: user.id || user.Id,
        createdTimestamp:
            user.createdDate || user.CreatedDate || user.Created_Time || user.hs_timestamp || user.created_time,
        updatedTimestamp: user.lastModifiedDate || user.LastModifiedDate || user.Modified_Time,
        firstName: user.firstname || user.First_Name || user.FirstName || user.first_name,
        lastName: user.lastname || user.Last_Name || user.LastName || user.last_name,
        phone: user.phone || user.phone_number || user.Phone || user.mobile,
        email: user.email || user.Email,
        additional: {},
    };

    // Map additional fields
    Object.keys(user).forEach((key) => {
        if (!(key in unifiedUser)) {
            unifiedUser['additional'][key] = user[key];
        }
    });

    return unifiedUser;
}

export function toSalesforceUser(unified: UnifiedUser): any {
    const salesforceUser: any = {
        Id: unified.remoteId,
        FirstName: unified.firstName,
        lastName: unified.lastName,
        Phone: unified.phone,
        Email: unified.email,
    };

    // Map custom fields
    if (unified.additional) {
        Object.keys(unified.additional).forEach((key) => {
            salesforceUser[key] = unified.additional?.[key];
        });
    }
    return salesforceUser;
}

export function toZohoUser(unified: UnifiedUser): any {
    const zoho: any = {
        users: [{}],
        apply_feature_execution: [
            {
                name: 'layout_rules',
            },
        ],
        trigger: ['approval', 'workflow', 'blueprint'],
    };
    zoho.users[0].first_name = unified.firstName;
    zoho.users[0].last_name = unified.lastName;
    zoho.users[0].phone = unified.phone;
    zoho.users[0].email = unified.email;

    // Map custom fields
    if (unified.additional) {
        Object.keys(unified.additional).forEach((key) => {
            zoho.users[0][key] = unified.additional?.[key];
        });
    }
    return zoho;
}

export function toHubspotUser(unified: UnifiedUser): any {
    const hubspotUser: any = {
        id: unified.remoteId,
        firstname: unified.firstName,
        lastname: unified.lastName,
        phone: unified.phone,
        email: unified.email,
    };
    // Map custom fields
    if (unified.additional) {
        Object.keys(unified.additional).forEach((key) => {
            hubspotUser[key] = unified.additional?.[key];
        });
    }

    return hubspotUser;
}

export function disunifyUser(note: UnifiedUser, integrationId: string): any {
    if (integrationId === 'sfdc') {
        return toSalesforceUser(note);
    } else if (integrationId === 'hubspot') {
        return toHubspotUser(note);
    } else if (integrationId === 'zohocrm') {
        return toZohoUser(note);
    }
}
