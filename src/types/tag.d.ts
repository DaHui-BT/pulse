const enum Status {
  PRIVATE,
  PUBLIC,
  DELETED
}

type TagType = {
  _id: ObjectId;          // Unique identifier for the tag
  creator_id: string;     // ID of the user who created the tag
  tag_color: string;      // Hex color code (e.g., '#ff5733') for visual identification
  tag_name: string;       // Short name for the tag (e.g., "JavaScript")
  tag_desc: string;       // Brief description of the tag's purpose or usage
  created_at: Date;       // Date the tag was created
  updated_at?: Date;      // Date the tag was last updated
  is_active: boolean;     // Status indicating if the tag is active or archived
}

export { TagType }
