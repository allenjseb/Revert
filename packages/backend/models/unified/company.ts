export interface UnifiedCompany {
    name: string;
    industry: string;
    description: string;
    annualRevenue: number;
    size: number;
    phone: string;
    address: {
        street: string; // Note: No street field in Hubspot.
        city: string;
        state: string;
        country: string;
        zip: string;
        postalCode: string;
    };
    id: string;
    remoteId: string;
    createdTimestamp: Date;
    updatedTimestamp: Date;
    associations?: any; // TODO: Support associations
    additional: any;
}

export function unifyCompany(company: any): UnifiedCompany {
    if (!company) return company;
    const unifiedCompany: UnifiedCompany = {
        annualRevenue: company.Annual_Revenue || company.AnnualRevenue || company.annualrevenue,
        remoteId: company.id || company.Company_Id || company.company_id || company.Id,
        description: company.Description || company.description,
        id: company.id || company.Company_Id || company.company_id || company.Id,
        name: company.name || company.Company_Name || company.company_name || company.Name || company.Account_Name,
        phone: company.phone || company.Phone || company.phone,
        address: {
            street:
                company.street || company.BillingAddress?.street || company.address?.street || company.Billing_Street,
            city: company.city || company.City || company.city || company.BillingAddress?.city || company.Billing_City,
            state:
                company.state ||
                company.State ||
                company.state ||
                company.BillingAddress?.state ||
                company.Billing_State,
            country:
                company.country ||
                company.Country ||
                company.country ||
                company.BillingAddress?.country ||
                company.Billing_Country,
            zip: company.zip || company.Zip || company.zip || company.BillingAddress?.zipCode || company.Billing_Code,
            postalCode: company.postalCode || company.BillingAddress?.postalCode || company.Billing_Code,
        },
        industry: company.industry || company.Industry || company.industry,
        size:
            company.size ||
            company.Size ||
            company.size ||
            company.NumberOfEmployees ||
            company.Employees ||
            company.numberofemployees,
        createdTimestamp:
            company.createdDate ||
            company.Created_Time ||
            company.created_date ||
            company.createdate ||
            company.CreatedDate,
        updatedTimestamp:
            company.modifiedDate ||
            company.Modified_Time ||
            company.modified_date ||
            company.hs_lastmodifieddate ||
            company.LastModifiedDate,
        additional: {},
    };

    // Map additional fields
    Object.keys(company).forEach((key) => {
        if (!(key in unifiedCompany)) {
            unifiedCompany['additional'][key] = company[key];
        }
    });

    return unifiedCompany;
}

export interface HubspotCompany {
    company_size: string;
    date_of_birth: string;
    days_to_close: number;
    degree: string;
    field_of_study: string;
    first_conversion_date: Date;
    first_conversion_event_name: string;
    first_deal_created_date: Date;
    gender: string;
    graduation_date: string;
    hs_additional_emails: number;
    hs_all_assigned_business_unit_ids: number;
    hs_all_contact_vids: number;
    hs_analytics_first_touch_converting_campaign: string;
    hs_analytics_last_touch_converting_campaign: string;
    hs_avatar_filemanager_key: string;
    hs_buying_role: number;
    hs_calculated_form_submissions: number;
    hs_calculated_merged_vids: number;
    hs_calculated_mobile_number: string;
    hs_calculated_phone_number: string;
    hs_calculated_phone_number_area_code: string;
    hs_calculated_phone_number_country_code: string;
    hs_calculated_phone_number_region_code: string;
    hs_clicked_linkedin_ad: number;
    hs_content_membership_email: string;
    hs_content_membership_email_confirmed: boolean;
    hs_content_membership_follow_up_enqueued_at: Date;
    hs_content_membership_notes: string;
    hs_content_membership_registered_at: Date;
    hs_content_membership_registration_domain_sent_to: string;
    hs_content_membership_registration_email_sent_at: Date;
    hs_content_membership_status: number;
    hs_conversations_visitor_email: string;
    hs_count_is_unworked: number;
    hs_count_is_worked: number;
    hs_created_by_conversations: boolean;
    hs_created_by_user_id: number;
    hs_createdate: Date;
    hs_date_entered_customer: Date;
    hs_date_entered_evangelist: Date;
    hs_date_entered_lead: Date;
    hs_date_entered_marketingqualifiedlead: Date;
    hs_date_entered_opportunity: Date;
    hs_date_entered_other: Date;
    hs_date_entered_salesqualifiedlead: Date;
    hs_date_entered_subscriber: Date;
    hs_date_exited_customer: Date;
    hs_date_exited_evangelist: Date;
    hs_date_exited_lead: Date;
    hs_date_exited_marketingqualifiedlead: Date;
    hs_date_exited_opportunity: Date;
    hs_date_exited_other: Date;
    hs_date_exited_salesqualifiedlead: Date;
    hs_date_exited_subscriber: Date;
    hs_document_last_revisited: Date;
    hs_email_bad_address: boolean;
    hs_email_customer_quarantined_reason: number;
    hs_email_domain: string;
    hs_email_hard_bounce_reason: string;
    hs_email_hard_bounce_reason_enum: number;
    hs_email_quarantined: boolean;
    hs_email_quarantined_reason: number;
    hs_email_recipient_fatigue_recovery_time: Date;
    hs_email_sends_since_last_engagement: number;
    hs_emailconfirmationstatus: number;
    hs_facebook_ad_clicked: boolean;
    hs_facebook_click_id: string;
    hs_facebookid: string;
    hs_feedback_last_nps_follow_up: string;
    hs_feedback_last_nps_rating: number;
    hs_feedback_last_survey_date: Date;
    hs_feedback_show_nps_web_survey: boolean;
    hs_first_engagement_object_id: number;
    hs_first_subscription_create_date: Date;
    hs_google_click_id: string;
    hs_googleplusid: string;
    hs_has_active_subscription: number;
    hs_ip_timezone: string;
    hs_is_contact: boolean;
    hs_is_unworked: boolean;
    hs_last_sales_activity_date: Date;
    hs_last_sales_activity_timestamp: Date;
    hs_last_sales_activity_type: number;
    hs_lastmodifieddate: Date;
    hs_latest_sequence_ended_date: Date;
    hs_latest_sequence_enrolled: number;
    hs_latest_sequence_enrolled_date: Date;
    hs_latest_sequence_finished_date: Date;
    hs_latest_sequence_unenrolled_date: Date;
    hs_latest_source_timestamp: Date;
    hs_latest_subscription_create_date: Date;
    hs_lead_status: number;
    hs_legal_basis: number;
    hs_linkedin_ad_clicked: number;
    hs_linkedinid: string;
    hs_marketable_reason_id: string;
    hs_marketable_reason_type: number;
    hs_marketable_status: number;
    hs_marketable_until_renewal: number;
    hs_merged_object_ids: number;
    hs_object_id: number;
    hs_pinned_engagement_id: number;
    hs_pipeline: number;
    hs_predictivecontactscore_v2: number;
    hs_predictivescoringtier: number;
    hs_read_only: boolean;
    hs_sa_first_engagement_date: Date;
    hs_sa_first_engagement_descr: number;
    hs_sa_first_engagement_object_type: number;
    hs_sales_email_last_clicked: Date;
    hs_sales_email_last_opened: Date;
    hs_searchable_calculated_international_mobile_number: string;
    hs_searchable_calculated_international_phone_number: string;
    hs_searchable_calculated_mobile_number: string;
    hs_searchable_calculated_phone_number: string;
    hs_sequences_actively_enrolled_count: number;
    hs_sequences_enrolled_count: number;
    hs_sequences_is_enrolled: boolean;
    hs_testpurge: string;
    hs_testrollback: string;
    hs_time_between_contact_creation_and_deal_close: number;
    hs_time_between_contact_creation_and_deal_creation: number;
    hs_time_in_customer: number;
    hs_time_in_evangelist: number;
    hs_time_in_lead: number;
    hs_time_in_marketingqualifiedlead: number;
    hs_time_in_opportunity: number;
    hs_time_in_other: number;
    hs_time_in_salesqualifiedlead: number;
    hs_time_in_subscriber: number;
    hs_time_to_first_engagement: number;
    hs_time_to_move_from_lead_to_customer: number;
    hs_time_to_move_from_marketingqualifiedlead_to_customer: number;
    hs_time_to_move_from_opportunity_to_customer: number;
    hs_time_to_move_from_salesqualifiedlead_to_customer: number;
    hs_time_to_move_from_subscriber_to_customer: number;
    hs_timezone: number;
    hs_twitterid: string;
    hs_unique_creation_key: string;
    hs_updated_by_user_id: number;
    hs_user_ids_of_all_notification_followers: number;
    hs_user_ids_of_all_notification_unfollowers: number;
    hs_user_ids_of_all_owners: number;
    hs_whatsapp_phone_number: string;
    hubspot_owner_assigneddate: Date;
    ip_city: string;
    ip_country: string;
    ip_country_code: string;
    ip_latlon: string;
    ip_state: string;
    ip_state_code: string;
    ip_zipcode: string;
    job_function: string;
    lastmodifieddate: Date;
    marital_status: string;
    military_status: string;
    num_associated_deals: number;
    num_conversion_events: number;
    num_unique_conversion_events: number;
    recent_conversion_date: Date;
    recent_conversion_event_name: string;
    recent_deal_amount: number;
    recent_deal_close_date: Date;
    relationship_status: string;
    school: string;
    seniority: string;
    start_date: string;
    test: number;
    total_revenue: number;
    work_email: string;
    firstname?: string;
    hs_analytics_first_url: string;
    hs_email_delivered: number;
    hs_email_optout_78547538: number;
    twitterhandle: string;
    currentlyinworkflow: number;
    followercount: number;
    hs_analytics_last_url: string;
    hs_email_open: number;
    lastname: string;
    hs_analytics_num_page_views: number;
    hs_email_click: number;
    salutation: string;
    twitterprofilephoto: string;
    email: string;
    hs_analytics_num_visits: number;
    hs_email_bounce: number;
    hs_persona: number;
    hs_social_last_engagement: Date;
    hs_analytics_num_event_completions: number;
    hs_email_optout: boolean;
    hs_social_twitter_clicks: number;
    mobilephone: string;
    phone?: string;
    fax: string;
    hs_analytics_first_timestamp: Date;
    hs_email_last_email_name: string;
    hs_email_last_send_date: Date;
    hs_social_facebook_clicks: number;
    address?: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        zipCode: string;
    };
    engagements_last_meeting_booked: Date;
    engagements_last_meeting_booked_campaign: string;
    engagements_last_meeting_booked_medium: string;
    engagements_last_meeting_booked_source: string;
    hs_analytics_first_visit_timestamp: Date;
    hs_email_last_open_date: Date;
    hs_latest_meeting_activity: Date;
    hs_sales_email_last_replied: Date;
    hs_social_linkedin_clicks: number;
    hubspot_owner_id: number;
    notes_last_contacted: Date;
    notes_last_updated: Date;
    notes_next_activity_date: Date;
    num_contacted_notes: number;
    num_notes: number;
    owneremail: string;
    ownername: string;
    surveymonkeyeventlastupdated: number;
    webinareventlastupdated: number;
    city: string;
    hs_analytics_last_timestamp: Date;
    hs_email_last_click_date: Date;
    hs_social_google_plus_clicks: number;
    hubspot_team_id: number;
    linkedinbio: string;
    twitterbio: string;
    hs_all_owner_ids: number;
    hs_analytics_last_visit_timestamp: Date;
    hs_email_first_send_date: Date;
    hs_social_num_broadcast_clicks: number;
    state: string;
    hs_all_team_ids: number;
    hs_analytics_source: number;
    hs_email_first_open_date: Date;
    hs_latest_source: number;
    zip: string;
    country: string;
    hs_all_accessible_team_ids: number;
    hs_analytics_source_data_1: string;
    hs_email_first_click_date: Date;
    hs_latest_source_data_1: string;
    linkedinconnections: number;
    hs_analytics_source_data_2: string;
    hs_email_is_ineligible: boolean;
    hs_language: number;
    hs_latest_source_data_2: string;
    kloutscoregeneral: number;
    hs_analytics_first_referrer: string;
    hs_email_first_reply_date: Date;
    jobtitle: string;
    photo: string;
    hs_analytics_last_referrer: string;
    hs_email_last_reply_date: Date;
    message: string;
    closedate: Date;
    hs_analytics_average_page_views: number;
    hs_email_replied: number;
    hs_analytics_revenue: number;
    hs_lifecyclestage_lead_date: Date;
    hs_lifecyclestage_marketingqualifiedlead_date: Date;
    hs_lifecyclestage_opportunity_date: Date;
    lifecyclestage: number;
    hs_lifecyclestage_salesqualifiedlead_date: Date;
    createdate: Date;
    hs_lifecyclestage_evangelist_date: Date;
    hs_lifecyclestage_customer_date: Date;
    hubspotscore: number;
    company?: string;
    hs_lifecyclestage_subscriber_date: Date;
    hs_lifecyclestage_other_date: Date;
    website: string;
    numemployees: number;
    annualrevenue: string;
    industry?: string;
    associatedcompanyid: number;
    associatedcompanylastupdated: number;
    hs_predictivecontactscorebucket: number;
    hs_predictivecontactscore: number;
}
export interface ZohoCompany {
    Owner: string;
    Rating: string;
    Account_Name: string;
    Phone: string;
    Account_Site: string;
    Fax: string;
    Parent_Account: string;
    Website: string;
    Account_Number: bigint;
    Ticker_Symbol: string;
    Account_Type: string;
    Ownership: string;
    Industry: string;
    Employees: number;
    Annual_Revenue: number;
    SIC_Code: number;
    Created_By: string;
    Modified_By: string;
    Created_Time: Date;
    Modified_Time: Date;
    Last_Activity_Time: Date;
    Last_Enriched_Time__s: Date;
    Enrich_Status__s: string;
    Billing_Street: string;
    Shipping_Street: string;
    Billing_City: string;
    Shipping_City: string;
    Billing_State: string;
    Shipping_State: string;
    Billing_Code: string;
    Shipping_Code: string;
    Billing_Country: string;
    Shipping_Country: string;
    Description: string;
    Record_Image: string;
}
export interface SalesforceCompany {
    Id: string;
    IsDeleted: boolean;
    MasterRecordId: string;
    Name?: string;
    Type?: string;
    ParentId?: string;
    BillingStreet?: string;
    BillingCity?: string;
    BillingState?: string;
    BillingPostalCode?: string;
    BillingCountry?: string;
    BillingLatitude: number;
    BillingLongitude: number;
    BillingGeocodeAccuracy: string;
    BillingAddress: { [key: string]: any };
    ShippingStreet: string;
    ShippingCity: string;
    ShippingState: string;
    ShippingPostalCode: string;
    ShippingCountry: string;
    ShippingLatitude: number;
    ShippingLongitude: number;
    ShippingGeocodeAccuracy: string;
    ShippingAddress: { [key: string]: any };
    Phone?: string;
    Fax: string;
    AccountNumber: string;
    Website?: string;
    PhotoUrl: string;
    Sic: string;
    Industry?: string;
    AnnualRevenue?: number;
    NumberOfEmployees?: number;
    Ownership: string;
    TickerSymbol?: string;
    Description?: string;
    Rating: string;
    Site: string;
    OwnerId: string;
    CreatedDate: Date;
    CreatedById: string;
    LastModifiedDate: Date;
    LastModifiedById: string;
    SystemModstamp: Date;
    LastActivityDate?: Date;
    LastViewedDate: Date;
    LastReferencedDate: Date;
    Jigsaw: string;
    JigsawCompanyId: string;
    CleanStatus: string;
    AccountSource: string;
    DunsNumber: string;
    Tradestyle: string;
    NaicsCode: string;
    NaicsDesc: string;
    YearStarted: string;
    SicDesc: string;
    DandbCompanyId: string;
    OperatingHoursId: string;
}

export function toSalesforceCompany(unifiedCompany: UnifiedCompany): Partial<SalesforceCompany> {
    const salesforceCompany: any = {
        Id: unifiedCompany.id!,
        Name: unifiedCompany.name,
        Type: unifiedCompany.additional?.type,
        BillingStreet: unifiedCompany.address?.street,
        BillingCity: unifiedCompany.address?.city,
        BillingState: unifiedCompany.address?.state,
        BillingPostalCode: unifiedCompany.address?.postalCode || unifiedCompany.address?.zip,
        BillingCountry: unifiedCompany.address?.country,
        Phone: unifiedCompany.phone,
        Industry: unifiedCompany.industry,
        AnnualRevenue: unifiedCompany.annualRevenue,
        NumberOfEmployees: unifiedCompany.size,
        Description: unifiedCompany.description,
    };

    // Map custom fields
    if (unifiedCompany.additional) {
        Object.keys(unifiedCompany.additional).forEach((key) => {
            salesforceCompany[key] = unifiedCompany.additional?.[key];
        });
    }
    return salesforceCompany;
}

export function toZohoCompany(unified: UnifiedCompany): Partial<ZohoCompany> {
    const zoho: any = {
        data: [{}],
        apply_feature_execution: [
            {
                name: 'layout_rules',
            },
        ],
        trigger: ['approval', 'workflow', 'blueprint'],
    };
    zoho.data[0].Account_Name = unified.name;
    zoho.data[0].Phone = unified.phone; // TODO: Unify mobile number
    zoho.data[0].Account_Site = unified.additional?.website;
    zoho.data[0].Website = unified.additional?.website;
    zoho.data[0].Account_Type = unified.additional?.type;
    zoho.data[0].Industry = unified.industry;
    zoho.data[0].Employees = unified.additional?.numberOfEmployees;
    zoho.data[0].Annual_Revenue = unified.annualRevenue;
    zoho.data[0].Billing_Street = unified.address?.street;
    zoho.data[0].Billing_City = unified.address?.city;
    zoho.data[0].Billing_State = unified.address?.state;
    zoho.data[0].Billing_Code = unified.address?.postalCode;
    zoho.data[0].Billing_Country = unified.address?.country;
    zoho.data[0].Description = unified.description;

    // Map custom fields
    if (unified.additional) {
        Object.keys(unified.additional).forEach((key) => {
            zoho.data[0][key] = unified.additional?.[key];
        });
    }
    return zoho;
}

export function toHubspotCompany(unifiedCompany: UnifiedCompany): Partial<HubspotCompany> {
    const hubspotCompany: any = {
        properties: {
            name: unifiedCompany.name,
            industry: unifiedCompany.industry,
            phone: unifiedCompany.phone,
            description: unifiedCompany.description,
            city: unifiedCompany.address?.city,
            state: unifiedCompany.address?.state,
            country: unifiedCompany.address?.country,
            zip: unifiedCompany.address?.postalCode || unifiedCompany.address?.zip,
            numberofemployees: unifiedCompany.size,
            annualrevenue: unifiedCompany.annualRevenue,
        },
    };

    // Map custom fields
    if (unifiedCompany.additional) {
        Object.keys(unifiedCompany.additional).forEach((key) => {
            hubspotCompany['properties'][key] = unifiedCompany.additional?.[key];
        });
    }

    return hubspotCompany;
}

export function disunifyCompany(company: UnifiedCompany, integrationId: string): any {
    if (integrationId === 'sfdc') {
        return toSalesforceCompany(company);
    } else if (integrationId === 'hubspot') {
        return toHubspotCompany(company);
    } else if (integrationId === 'zohocrm') {
        return toZohoCompany(company);
    }
}
