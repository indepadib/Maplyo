export type OrganizationRole = "owner" | "admin" | "manager" | "member" | "viewer";

export type PropertyType =
  | "vacation_rental"
  | "riad"
  | "guest_house"
  | "hotel"
  | "aparthotel"
  | "serviced_apartment"
  | "hostel"
  | "resort"
  | "other";

export interface Organization {
  id: string;
  name: string;
  slug?: string | null;
  billingEmail?: string | null;
  countryCode?: string | null;
  defaultCurrency: string;
}

export interface Property {
  id: string;
  organizationId: string;
  name: string;
  propertyType: PropertyType;
  status: "draft" | "active" | "paused" | "archived";
  city?: string | null;
  countryCode?: string | null;
  timezone?: string | null;
  websiteUrl?: string | null;
  sourceType?: string | null;
  sourceUrl?: string | null;
  sourceExternalId?: string | null;
  metadata?: Record<string, unknown>;
}

export interface Unit {
  id: string;
  propertyId: string;
  name: string;
  code?: string | null;
  unitType?: string | null;
  capacity?: number | null;
}

export interface Guest {
  id: string;
  organizationId: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  preferredLanguage?: string | null;
  marketingConsent: boolean;
}

export interface Stay {
  id: string;
  organizationId: string;
  propertyId: string;
  unitId?: string | null;
  primaryGuestId?: string | null;
  source: string;
  externalReservationId?: string | null;
  checkInAt: string;
  checkOutAt: string;
  status: "inquiry" | "confirmed" | "checked_in" | "checked_out" | "cancelled" | "no_show";
  guestCount?: number | null;
  reservationValue?: number | null;
  currency?: string | null;
}

export interface Service {
  id: string;
  organizationId: string;
  propertyId?: string | null;
  name: string;
  description?: string | null;
  category: string;
  status: "draft" | "active" | "paused" | "archived";
  priceAmount?: number | null;
  currency: string;
  pricingType: "fixed" | "per_guest" | "per_night" | "quote";
  fulfillmentType: "property" | "partner" | "maplyo_marketplace";
  commissionRate: number;
}

export interface GuestOrder {
  id: string;
  organizationId: string;
  propertyId: string;
  stayId?: string | null;
  guestId?: string | null;
  status: "pending" | "confirmed" | "paid" | "fulfilled" | "cancelled" | "refunded" | "failed";
  subtotalAmount: number;
  commissionAmount: number;
  totalAmount: number;
  currency: string;
}
