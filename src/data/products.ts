import type { Product } from '../types'

/**
 * Fictional product fixture data for Zynthar Inc.
 * All product names, SKUs, and descriptions are invented.
 */
export const products: Product[] = [
  {
    id: 'p001',
    name: 'Zynthar Core',
    sku: 'ZNT-CORE-001',
    category: 'Platform',
    price: 299.00,
    status: 'active',
    description:
      'The foundational platform layer. Provides account management, billing, ' +
      'and the shared runtime that all other products build on.',
    createdAt: '2022-01-10',
    vendorId: 'v-internal',
  },
  {
    id: 'p002',
    name: 'Zynthar Analytics Suite',
    sku: 'ZNT-ANLT-001',
    category: 'Add-on',
    price: 149.00,
    status: 'active',
    description:
      'Real-time usage dashboards, retention cohorts, and exportable CSV reports ' +
      'for all events captured by Zynthar Core.',
    createdAt: '2022-06-20',
    vendorId: 'v-northgate',
  },
  {
    id: 'p003',
    name: 'Zynthar Connect API',
    sku: 'ZNT-CONN-001',
    category: 'Integration',
    price: 99.00,
    status: 'active',
    description:
      'REST and GraphQL endpoints giving third-party services read/write access ' +
      'to Zynthar data under OAuth 2.0.',
    createdAt: '2022-09-05',
    vendorId: 'v-lucid',
  },
  {
    id: 'p004',
    name: 'Zynthar Support Desk',
    sku: 'ZNT-SUPP-001',
    category: 'Service',
    price: 79.00,
    status: 'active',
    description:
      'Managed ticket queue, SLA tracking, and dedicated account support with ' +
      '48-hour response guarantee.',
    createdAt: '2023-02-14',
    vendorId: 'v-fernhollow',
  },
  {
    id: 'p005',
    name: 'Zynthar Sync Bridge',
    sku: 'ZNT-SYNC-001',
    category: 'Integration',
    price: 59.00,
    status: 'active',
    description:
      'Bi-directional data sync connector for popular CRM and ERP systems ' +
      'with configurable field mappings and conflict resolution.',
    createdAt: '2023-04-30',
    vendorId: 'v-internal',
  },
  {
    id: 'p006',
    name: 'Zynthar Identity Hub',
    sku: 'ZNT-IDNT-001',
    category: 'Platform',
    price: 0.00,
    status: 'draft',
    description:
      'Centralised SSO, MFA, and directory sync — currently in internal beta. ' +
      'Pricing not yet finalised.',
    createdAt: '2026-03-01',
    vendorId: 'v-northgate',
  },
  {
    id: 'p007',
    name: 'Zynthar Data Export',
    sku: 'ZNT-DEXP-001',
    category: 'Add-on',
    price: 39.00,
    status: 'active',
    description:
      'Scheduled bulk exports to S3, GCS, or Azure Blob in JSON, CSV, or Parquet ' +
      'format with configurable retention windows.',
    createdAt: '2023-07-18',
    vendorId: 'v-lucid',
  },
  {
    id: 'p008',
    name: 'Zynthar Audit Log',
    sku: 'ZNT-AUDL-001',
    category: 'Add-on',
    price: 49.00,
    status: 'active',
    description:
      'Immutable, tamper-evident log of all user and API actions. Queryable ' +
      'via the admin console or the Connect API.',
    createdAt: '2023-09-22',
    vendorId: 'v-summit',
  },
  {
    id: 'p009',
    name: 'Zynthar Onboarding Pack',
    sku: 'ZNT-ONBP-001',
    category: 'Service',
    price: 199.00,
    status: 'active',
    description:
      'Guided implementation engagement: kickoff call, data migration assistance, ' +
      'and a 30-day post-launch check-in with a solutions engineer.',
    createdAt: '2023-11-01',
    vendorId: 'v-fernhollow',
  },
  {
    id: 'p010',
    name: 'Zynthar Webhook Engine',
    sku: 'ZNT-WHKN-001',
    category: 'Integration',
    price: 0.00,
    status: 'draft',
    description:
      'Configurable outbound webhook dispatcher with retry logic, signature ' +
      'verification, and a delivery log. In private preview.',
    createdAt: '2026-05-10',
    vendorId: 'v-internal',
  },
  {
    id: 'p011',
    name: 'Zynthar Legacy Importer',
    sku: 'ZNT-LGCY-001',
    category: 'Integration',
    price: 119.00,
    status: 'discontinued',
    description:
      'One-time migration tool for customers moving from the v1 data model. ' +
      'Superseded by the Sync Bridge; no longer sold.',
    createdAt: '2022-03-15',
    vendorId: 'v-northgate',
  },
  {
    id: 'p012',
    name: 'Zynthar Mobile SDK',
    sku: 'ZNT-MOBL-001',
    category: 'Add-on',
    price: 89.00,
    status: 'active',
    description:
      'iOS and Android SDKs exposing Zynthar Core events and identity primitives ' +
      'with offline queue and automatic retry.',
    createdAt: '2024-02-28',
    vendorId: 'v-lucid',
  },
  {
    id: 'p013',
    name: 'Zynthar Reporting Engine',
    sku: 'ZNT-RPRT-001',
    category: 'Add-on',
    price: 129.00,
    status: 'active',
    description:
      'Pixel-perfect PDF and XLSX report generation from Zynthar data with ' +
      'customisable templates and scheduled delivery.',
    createdAt: '2024-04-11',
    vendorId: 'v-fernhollow',
  },
  {
    id: 'p014',
    name: 'Zynthar Enterprise Bundle',
    sku: 'ZNT-ENTB-001',
    category: 'Platform',
    price: 799.00,
    status: 'active',
    description:
      'All Platform, Add-on, and Integration products bundled at a discount, ' +
      'plus a dedicated Customer Success Manager and SLA-backed uptime commitment.',
    createdAt: '2024-08-01',
    vendorId: 'v-internal',
  },
  {
    id: 'p015',
    name: 'Zynthar Custom Training',
    sku: 'ZNT-TRNG-001',
    category: 'Service',
    price: 499.00,
    status: 'active',
    description:
      'Bespoke onsite or remote training sessions for engineering and operations ' +
      'teams, delivered by a Zynthar solutions engineer.',
    createdAt: '2024-10-15',
    vendorId: 'v-northgate',
  },
]
