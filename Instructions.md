# Stripe Dashboard Standards: Payments Surface

## Design Principles

- **Clarity first** - Prioritize clear information hierarchy and readability in payment interfaces
- **Progressive disclosure** - Surface essential payment information first, with details available on demand
- **Actionable insights** - Transform data into recommendations users can act on
- **Contextual awareness** - Preserve context when navigating between payment-related surfaces
- **Efficiency in complexity** - Optimize for common payment workflows while supporting advanced needs

## Visual System

### Typography
- Follow Sail type scale:
  - Heading 1: 24/28px
  - Heading 2: 18/24px
  - Heading 3: 16/20px
  - Body: 14/20px
  - Caption: 12/16px
- Use sentence case for all UI text (headings, buttons, labels, menu items)
- Never use all caps except for brand names that are stylized that way
- Use semibold (600) for headings, medium (500) for emphasis, regular (400) for body

### Color System
- Use Stripe's semantic colors:
  - Primary actions: `--brand-primary` (#635BFF)
  - Neutral text: `--text-default` (#1A1A1A)
  - Muted text: `--text-muted` (#697386)
  - Success: `--success` (#008767)
  - Warning: `--warning` (#7A2B00)
  - Error: `--error` (#DF1B41)
  - Borders: `--border` (#E6E6E6)
  - Page background: `--surface-background` (#F6F8FA)
  - Card background: `--surface-default` (#FFFFFF)
- Don't rely solely on color to convey meaning
- Use lighter color values for backgrounds, darker for text/icons

### Layout
- Use 8px grid system for all spacing
- Standard spacing tokens: 
  - 8px (xs)
  - 12px (sm)
  - 16px (md)
  - 24px (lg)
  - 32px (xl)
  - 48px (xxl)
- Standard page margins: 24px
- Maintain consistent spacing between related elements (16px)
- Use 24px spacing between major sections

## Components

### Navigation

#### `GlobalNav`
- Use for primary navigation between major product areas
- Current section should be clearly indicated
- Include support for search, notifications, and user menu

#### `Breadcrumbs`
- Use to show context and provide navigation to parent pages
- Keep to 3-4 levels maximum
- Use truncation for long item names
- Final item should be current page name (non-interactive)

#### `Tabs`
- Use for navigation between related views within a page
- Limit to 2-7 tabs
- Use sentence case for tab labels
- Include count badges where appropriate (e.g., "Issues (3)")
- Don't nest tabs

### Content Containers

#### `Page`
- Use as container for all full pages
- Includes consistent heading area and body spacing
- Supports actions in header area

#### `Card`
- Use for grouping related content
- Standard padding: 16px
- Can include header with title and actions
- Can be sectioned using `CardSection`
- Use `CardDivider` between sections

#### `EmptyState`
- Use when a list or table has no items to display
- Include helpful illustration, clear heading, and action button
- Provide guidance on how to add first item

### Data Display

#### `Table`
- Use `DataTable` for all tabular payment data
- Include column headers in sentence case
- Support sorting, filtering, and pagination
- Use sticky headers for tables with many rows
- Support row selection with checkboxes when bulk actions are available
- Implement `EmptyState` when no results are found
- Use `ExpandableRow` for progressive disclosure of details
- Keep column count reasonable (4-8 columns)

#### `List`
- Use for simpler data than tables
- Support for icons, primary text, secondary text, and actions
- Can be used with `ListDivider` between items

#### `KeyValueTable`
- Use for displaying metadata or property lists
- Keys should be in sentence case and left-aligned
- Values should be right-aligned

#### `Timeline`
- Use to show sequence of events related to a payment
- Support for different event types with appropriate icons
- Include timestamps in consistent format

### Actions

#### `Button`
- Use standard variants:
  - `primary` - Main action, limit to one per view
  - `secondary` - Alternative actions
  - `danger` - Destructive actions
  - `text` - Minor actions
  - `icon` - Compact actions (always with tooltip)
- Always use sentence case for button text
- Include loading state for asynchronous actions
- Group related buttons with `ButtonGroup`
- Use `DropdownButton` for multiple related actions

#### `ActionMenu`
- Use for contextual actions on list items or table rows
- Include icons for common actions
- Use sentence case for menu items
- Group related actions and use dividers between groups
- Place destructive actions last with divider above

### Forms

#### `FormField`
- Container for form inputs with consistent layout
- Always include visible label in sentence case
- Support for help text and validation messages
- Use `FormFieldGroup` for related fields

#### Common Inputs
- `TextInput` - Single line text entry
- `Textarea` - Multi-line text entry
- `Select` - Single selection from options
- `Combobox` - Filterable single selection
- `MultiSelect` - Multiple selections
- `Checkbox` - Boolean selection
- `RadioGroup` - Exclusive selection from options
- `Toggle` - Binary state with immediate effect
- `DatePicker` - Date selection

#### `FilterBar`
- Use for table and list filtering
- Support for quick filters and advanced filtering
- Allow saving of custom filter configurations
- Include clear and apply actions

### Feedback

#### `Banner`
- Use for page-level notifications
- Variants: `info`, `success`, `warning`, `error`
- Include dismiss option when appropriate
- Place at top of main content area

#### `Toast`
- Use for temporary notifications
- Display briefly and auto-dismiss
- Support for action buttons
- Stack when multiple are present

#### `InlineMessage`
- Use for contextual guidance within forms
- Variants match Banner variants
- Keep text concise and actionable

#### `Dialog`
- Use for important confirmations or focused tasks
- Include clear title in sentence case
- Provide primary and secondary actions
- Use for destructive actions requiring confirmation
- Don't nest dialogs

## Payment-Specific Patterns

### Status Indicators

#### `Badge`
- Use for payment status display
- Standard payment statuses:
  - `succeeded` - Green badge
  - `processing` - Blue badge with loading indicator
  - `requires_action` - Orange badge
  - `requires_payment_method` - Orange badge
  - `canceled` - Gray badge
  - `failed` - Red badge
- Use sentence case for status text
- Include icon for additional context when helpful

### Financial Data

#### `MoneyText`
- Use for all monetary amounts
- Always include currency symbol or code
- Right-align in tables and lists
- Format according to currency conventions
- Use color only as enhancement (green for positive, red for negative)

#### `PaymentMethodIcon`
- Use to visually identify payment methods
- Include card brand logos, wallet icons, etc.
- Pair with text description for accessibility

#### `DateTimeText`
- Use for timestamps and date ranges
- Support for relative time for recent events
- Support for precise time on hover
- Use user's timezone by default

### Payment Workflows

#### Transaction List
- Include key identifiers (ID, customer, amount)
- Show payment method details with appropriate icons
- Display status prominently with badges
- Support filtering by common attributes (status, date, amount)
- Enable bulk operations for refunds and other actions

#### Transaction Details
- Organize in logical sections (overview, customer, payment method, timeline)
- Show most important information at top
- Include complete audit trail in timeline
- Provide contextual actions based on payment state
- Link to related resources (customer, subscription, etc.)

#### Refund Flow
- Clearly indicate available refund amount
- Support partial refunds with amount input
- Require reason selection for tracking
- Show confirmation with summary before submission
- Update status immediately after submission with optimistic UI

## Data Visualization

### Chart Components
- `LineChart` - For time-series data like payment volume
- `BarChart` - For comparative data like payment methods
- `DonutChart` - For proportional data like status distribution

### Chart Standards
- Include clear titles in sentence case
- Provide interactive tooltips with precise values
- Support for filtering and date range selection
- Use consistent color scheme across all charts
- Include appropriate empty and loading states
- Ensure accessibility with screen reader support

### Dashboard Cards
- Group related metrics in `Card` components
- Include period-over-period comparisons where relevant
- Support drill-down to detailed data
- Use consistent time periods across related metrics

## Accessibility

- Maintain WCAG 2.1 AA compliance for all payment interfaces
- Ensure 4.5:1 minimum contrast ratio for text
- Support keyboard navigation for all workflows
- Implement proper ARIA attributes on custom components
- Ensure screen reader compatibility for dynamic content
- Provide text alternatives for all visual information
- Support zoom and text resizing up to 200%
- Test with screen readers and keyboard-only navigation

## Responsive Design

- All interfaces must function from 320px to 1440px width
- Use responsive layouts that adapt to available space
- On mobile viewports:
  - Stack elements vertically
  - Replace tables with card lists
  - Move actions to bottom bars when appropriate
  - Ensure touch targets are at least 44x44px
  - Use progressive disclosure for complex forms
