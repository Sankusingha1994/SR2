export interface PatientDetails {
    status: string
    data: Data
}

export interface Data {
    id: string
    created_at: string
    patient: Patient
    medicines: Medicine[]
}
export interface Patient {
    name: string
    first_name: string
    last_name: string
}

export interface Medicine {
    object: string
    id: number
    description: string
    VPID: string
    APID: string
    qty: string
    directions: string
    created_at: string
    updated_at: string
    APPID: string
    price: string
    QTYVAL: number
    pricePerTablet: string
    totalPrice: string
}
export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
  }

  export interface FindPharmacyInterface {
    length: number
    page: number
    dayOfWeek: string
    timeNow: string
    mapBoundary: MapBoundary
}

export interface MapBoundary {
    south: number
    west: number
    north: number
    east: number
}

export type Maploop = {
    item: String,
    key: Number
}


export type PharmacyListsInterface = {
    id: number
    name: string
    branch_logo?: string
    code: string
    pharmacyId: number
    email: string
    phone: string
    address: string
    city: string
    country: string
    postcode: string
    longitude: number
    latitude: number
    website: string
    isAvailableForAcceptOrder: boolean
    availabilityStatusBySuperAdmin: any
    superAdminAvailabilityStatusExpiry: any
    status: string
    createdAt: string
    ryftAccountId: string
    ryftAccountVerificationStatus: string
    ryftAccountFrozen: boolean
    ryftPayoutMethodStatus: string
    priceMultiple: string
    dispensingFee: string
    minimumItemCharge: string
}


export interface Bounds {
    south: number;
    west: number;
    north: number;
    east: number;
}

export interface MapEventsProps {
    updateBounds: () => void;
}

export type PrecriptionInputs = {
    prescriptionId: string
    dateOfBirth: string
}
