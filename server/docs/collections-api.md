# Personal collections API

All collection routes and wish mutations require `Authorization: Bearer <token>`.
Collections belong to the authenticated user; client-supplied owners are rejected.
Foreign and missing collections return the same 404 response.

## Collections

- `POST /api/collections`: create, returns 201.
- `GET /api/collections`: list your collections, newest first, returns 200.
- `GET /api/collections/:id`: get one collection with its summary, returns 200.
- `PATCH /api/collections/:id`: update supplied fields, returns 200.
- `DELETE /api/collections/:id`: delete and unlink wishes atomically, returns 204 without a body.

Create request (only name is required):

```json
{
  "name": "Birthday",
  "description": "Ideas for my birthday",
  "icon": "gift",
  "color": "sky"
}
```

Names are trimmed and contain 1-120 characters; descriptions are trimmed and limited
to 2000 characters. Description defaults to an empty string, icon to `house`, color
to `emerald`. Unknown fields, null values, unsupported choices and empty updates
are rejected.

Icons use Lucide names in kebab-case, verified against the installed
`lucide-react@1.59.0`. The 50 selectable keys are:

- General and gifts: `folder`, `heart`, `star`, `gift`, `party-popper`, `cake`, `shopping-bag`.
- Technology: `laptop`, `smartphone`, `tablet`, `headphones`, `watch`, `camera`, `gamepad-2`, `keyboard`, `monitor`.
- Home and cooking: `house`, `sofa`, `bed-double`, `lamp-desk`, `cooking-pot`, `utensils`, `coffee`, `bath`, `refrigerator`.
- Clothing and accessories: `shirt`, `footprints`, `glasses`, `backpack`, `gem`.
- Sports and outdoors: `dumbbell`, `bike`, `tent`, `mountain`, `volleyball`.
- Travel and transport: `plane`, `train-front`, `car`, `luggage`, `map-pin`.
- Books, learning, music, art and work: `book-open`, `graduation-cap`, `music`, `guitar`, `palette`, `briefcase`.
- Nature, pets and health: `flower-2`, `leaf`, `paw-print`, `heart-pulse`.

Only the listed Lucide keys are accepted and stored.
The server stores names only and does not depend on the React icon package.
For example, the client can render `headphones` using Lucide's `Headphones` component.

Colors: `sky`, `emerald`, `violet`, `rose`, `amber`, `red`, `teal`,
`indigo`, `lime`, `orange`. These are palette keys, not arbitrary CSS values.

Example response (the list endpoint returns an array of these objects):

```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Birthday",
  "description": "Ideas for my birthday",
  "icon": "gift",
  "color": "sky",
  "createdAt": "2026-10-21T12:00:00.000Z",
  "updatedAt": "2026-10-21T12:00:00.000Z",
  "wishCount": 2,
  "previewImages": ["https://example.com/headphones.webp"]
}
```

Counts include active and completed wishes. Previews contain up to three nonempty
image URLs, ordered by wish date (newest first, then descending ID).
Missing images are skipped; an empty collection returns 0 and [].
Counts and previews are derived from wishes rather than stored separately.
The server reads the selected collections and their wishes in two queries, then
builds summaries in JavaScript. Only membership and image fields are loaded for
wishes. This favors readability for personal wishlists; memory usage grows with
the number of matching wishes.

## Wish membership

`POST /api/wish/create` accepts optional `collectionIds` alongside the existing
wish fields. Existing clients can omit it. For example:

```json
{
  "title": "Headphones",
  "isHidden": false,
  "price": "0",
  "primaryCurrency": "BYN",
  "collectionIds": ["507f1f77bcf86cd799439011"]
}
```

`PATCH /api/wish/:id/collections` replaces the complete selection and returns
the updated wish (200). It accepts only:

```json
{ "collectionIds": ["507f1f77bcf86cd799439011"] }
```

An empty array removes all memberships. This dedicated endpoint requires the
field; requests to other wish endpoints do not implicitly change memberships.
IDs are normalized and deduplicated. Every collection and the wish must belong to
the current user. An invalid or unavailable selection is rejected as a whole.

The existing bodyless `PATCH /api/wish/:id` still marks the wish completed (201),
preserving memberships. `DELETE /api/wish/:id` still returns the deleted wish
(201). Both now require authentication and ownership.

## Filtering and privacy

- `GET /api/wish`: all your wishes.
- `GET /api/wish?collectionId=<id>`: wishes in one of your collections.
- `GET /api/wish?withoutCollection=true`: wishes without collections,
  including old documents where the field is absent.

Combining both filters is invalid. Collection filters must be single values.
All these responses include `collectionIds` for your own wishes.

Membership does not change `isHidden`. Ideas and another person's public wish
responses omit `collectionIds` entirely. Public wish detail remains accessible
without a token; private wish detail requires its owner's token.

Copying via `POST /api/wish/:id/copy` creates a wish without any collection
memberships. Deleting a collection preserves wishes and their other memberships.

## Errors

Errors have the shape `{ "message": "..." }`.

- 400: malformed ID, body, filter or unsupported field value.
- 413: JSON request body exceeds the server limit (100 KB).
- 403: missing or invalid authentication (existing project convention).
- 404: collection/wish missing or inaccessible to the current user.
- 500: unexpected server failure. Transaction failures do not partially save links.

## Storage and deployment

The server uses a separate Collection model and a `Wish.collectionIds` ObjectId
array. No backfill is required for old wishes. Indexes cover collection ownership
and wish ownership/membership.

Link creation/replacement and collection deletion use MongoDB transactions.
Deploy on a replica set or supported sharded cluster, not standalone MongoDB.
Assignments write-lock the referenced collections so a concurrent deletion cannot
leave a new dangling reference. Transaction callbacks perform database work only;
price conversion and image upload happen outside retries.
