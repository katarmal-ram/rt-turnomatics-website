export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_history: {
        Row: {
          created_at: string | null
          id: string
          message: Json
          project_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: Json
          project_id: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: Json
          project_id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      chat_memory: {
        Row: {
          created_at: string | null
          id: string
          message_range: unknown | null
          project_id: string
          summary: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message_range?: unknown | null
          project_id: string
          summary: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message_range?: unknown | null
          project_id?: string
          summary?: string
        }
        Relationships: []
      }
      chat_projects: {
        Row: {
          business_description: string | null
          business_name: string
          created_at: string | null
          id: string
          project_type: string | null
          site_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          business_description?: string | null
          business_name: string
          created_at?: string | null
          id?: string
          project_type?: string | null
          site_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          business_description?: string | null
          business_name?: string
          created_at?: string | null
          id?: string
          project_type?: string | null
          site_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_chat_projects_site_id"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          business_data: Json | null
          completion_percentage: number | null
          created_at: string | null
          id: string
          project_name: string | null
          project_status: string | null
          required_fields: Json | null
          session_data: Json | null
          site_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          business_data?: Json | null
          completion_percentage?: number | null
          created_at?: string | null
          id?: string
          project_name?: string | null
          project_status?: string | null
          required_fields?: Json | null
          session_data?: Json | null
          site_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          business_data?: Json | null
          completion_percentage?: number | null
          created_at?: string | null
          id?: string
          project_name?: string | null
          project_status?: string | null
          required_fields?: Json | null
          session_data?: Json | null
          site_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions_v4: {
        Row: {
          business_description: string | null
          business_name: string
          context_summary: string | null
          created_at: string | null
          current_step: string | null
          id: string
          industry: string | null
          session_data: Json | null
          site_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          business_description?: string | null
          business_name: string
          context_summary?: string | null
          created_at?: string | null
          current_step?: string | null
          id?: string
          industry?: string | null
          session_data?: Json | null
          site_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          business_description?: string | null
          business_name?: string
          context_summary?: string | null
          created_at?: string | null
          current_step?: string | null
          id?: string
          industry?: string | null
          session_data?: Json | null
          site_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_v4_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_history_v4: {
        Row: {
          config_changes: Json | null
          created_at: string | null
          id: string
          message: string
          rag_context: Json | null
          response: string
          retrieved_sections: string[] | null
          session_id: string | null
        }
        Insert: {
          config_changes?: Json | null
          created_at?: string | null
          id?: string
          message: string
          rag_context?: Json | null
          response: string
          retrieved_sections?: string[] | null
          session_id?: string | null
        }
        Update: {
          config_changes?: Json | null
          created_at?: string | null
          id?: string
          message?: string
          rag_context?: Json | null
          response?: string
          retrieved_sections?: string[] | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversation_history_v4_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions_v4"
            referencedColumns: ["id"]
          },
        ]
      }
      deployment_logs: {
        Row: {
          deployment_id: string
          deployment_url: string | null
          id: string
          log_level: string
          message: string
          metadata: Json | null
          platform: string | null
          site_id: string | null
          timestamp: string
        }
        Insert: {
          deployment_id: string
          deployment_url?: string | null
          id?: string
          log_level?: string
          message: string
          metadata?: Json | null
          platform?: string | null
          site_id?: string | null
          timestamp?: string
        }
        Update: {
          deployment_id?: string
          deployment_url?: string | null
          id?: string
          log_level?: string
          message?: string
          metadata?: Json | null
          platform?: string | null
          site_id?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "deployment_logs_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      enhanced_business_data: {
        Row: {
          additional_sections: Json | null
          ai_enhanced_description: string | null
          assets: Json | null
          business_description: string | null
          business_name: string
          business_type: string
          created_at: string | null
          full_address: Json | null
          id: string
          operating_hours: Json | null
          products: Json | null
          services: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          additional_sections?: Json | null
          ai_enhanced_description?: string | null
          assets?: Json | null
          business_description?: string | null
          business_name: string
          business_type: string
          created_at?: string | null
          full_address?: Json | null
          id?: string
          operating_hours?: Json | null
          products?: Json | null
          services?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          additional_sections?: Json | null
          ai_enhanced_description?: string | null
          assets?: Json | null
          business_description?: string | null
          business_name?: string
          business_type?: string
          created_at?: string | null
          full_address?: Json | null
          id?: string
          operating_hours?: Json | null
          products?: Json | null
          services?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string
          display_order: number | null
          id: string
          site_id: string
          storage_path: string
          updated_at: string
          user_id: string
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          site_id: string
          storage_path: string
          updated_at?: string
          user_id: string
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          site_id?: string
          storage_path?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_images_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_configs_v4: {
        Row: {
          config: Json
          config_type: string
          created_at: string | null
          id: string
          session_id: string | null
          status: string | null
        }
        Insert: {
          config: Json
          config_type: string
          created_at?: string | null
          id?: string
          session_id?: string | null
          status?: string | null
        }
        Update: {
          config?: Json
          config_type?: string
          created_at?: string | null
          id?: string
          session_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "generated_configs_v4_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions_v4"
            referencedColumns: ["id"]
          },
        ]
      }
      payload_media: {
        Row: {
          alt: string | null
          caption: string | null
          created_at: string | null
          file_size: number | null
          filename: string
          height: number | null
          id: string
          mime_type: string | null
          updated_at: string | null
          url: string
          width: number | null
        }
        Insert: {
          alt?: string | null
          caption?: string | null
          created_at?: string | null
          file_size?: number | null
          filename: string
          height?: number | null
          id?: string
          mime_type?: string | null
          updated_at?: string | null
          url: string
          width?: number | null
        }
        Update: {
          alt?: string | null
          caption?: string | null
          created_at?: string | null
          file_size?: number | null
          filename?: string
          height?: number | null
          id?: string
          mime_type?: string | null
          updated_at?: string | null
          url?: string
          width?: number | null
        }
        Relationships: []
      }
      payload_migrations: {
        Row: {
          batch: number | null
          executed_at: string | null
          id: string
          name: string
        }
        Insert: {
          batch?: number | null
          executed_at?: string | null
          id?: string
          name: string
        }
        Update: {
          batch?: number | null
          executed_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      payload_preferences: {
        Row: {
          created_at: string | null
          id: string
          key: string
          updated_at: string | null
          user_id: string | null
          value: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          updated_at?: string | null
          user_id?: string | null
          value?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          user_id?: string | null
          value?: Json | null
        }
        Relationships: []
      }
      products_sections: {
        Row: {
          created_at: string | null
          description: Json | null
          enabled: boolean | null
          id: string
          products: Json | null
          site_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: Json | null
          enabled?: boolean | null
          id?: string
          products?: Json | null
          site_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: Json | null
          enabled?: boolean | null
          id?: string
          products?: Json | null
          site_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_sections_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          company_name?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      project_assets: {
        Row: {
          asset_type: string
          chat_session_id: string | null
          created_at: string | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          metadata: Json | null
          mime_type: string | null
          user_id: string
        }
        Insert: {
          asset_type: string
          chat_session_id?: string | null
          created_at?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          user_id: string
        }
        Update: {
          asset_type?: string
          chat_session_id?: string | null
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_assets_chat_session_id_fkey"
            columns: ["chat_session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      project_versions: {
        Row: {
          chat_session_id: string
          created_at: string | null
          generation_data: Json
          id: string
          site_id: string
          updated_at: string | null
          version_number: number
        }
        Insert: {
          chat_session_id: string
          created_at?: string | null
          generation_data?: Json
          id?: string
          site_id: string
          updated_at?: string | null
          version_number?: number
        }
        Update: {
          chat_session_id?: string
          created_at?: string | null
          generation_data?: Json
          id?: string
          site_id?: string
          updated_at?: string | null
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_versions_chat_session_id_fkey"
            columns: ["chat_session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_versions_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      section_embeddings: {
        Row: {
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          section_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          section_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          section_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "section_embeddings_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "section_schemas"
            referencedColumns: ["id"]
          },
        ]
      }
      section_schemas: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          examples: Json[] | null
          id: string
          industry_tags: string[] | null
          schema_data: Json
          section_type: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          examples?: Json[] | null
          id?: string
          industry_tags?: string[] | null
          schema_data: Json
          section_type: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          examples?: Json[] | null
          id?: string
          industry_tags?: string[] | null
          schema_data?: Json
          section_type?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_domains: {
        Row: {
          created_at: string | null
          dns_configured: boolean | null
          domain_name: string
          id: string
          is_custom: boolean | null
          netlify_dns_zone_id: string | null
          netlify_domain_id: string | null
          site_id: string | null
          ssl_status: string | null
          status: string | null
          updated_at: string | null
          verification_status: string | null
        }
        Insert: {
          created_at?: string | null
          dns_configured?: boolean | null
          domain_name: string
          id?: string
          is_custom?: boolean | null
          netlify_dns_zone_id?: string | null
          netlify_domain_id?: string | null
          site_id?: string | null
          ssl_status?: string | null
          status?: string | null
          updated_at?: string | null
          verification_status?: string | null
        }
        Update: {
          created_at?: string | null
          dns_configured?: boolean | null
          domain_name?: string
          id?: string
          is_custom?: boolean | null
          netlify_dns_zone_id?: string | null
          netlify_domain_id?: string | null
          site_id?: string | null
          ssl_status?: string | null
          status?: string | null
          updated_at?: string | null
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "site_domains_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "sites"
            referencedColumns: ["id"]
          },
        ]
      }
      sites: {
        Row: {
          build_completed_at: string | null
          build_started_at: string | null
          build_status: string | null
          created_at: string | null
          custom_domain: string | null
          deployment_logs: Json | null
          deployment_platform: string | null
          deployment_status: string | null
          github_repo_url: string | null
          id: string
          last_deployed_at: string | null
          netlify_build_hook_url: string | null
          netlify_deployment_id: string | null
          netlify_site_id: string | null
          products_config: Json
          site_config: Json
          site_name: string
          status: string | null
          updated_at: string | null
          user_id: string
          vercel_deployment_id: string | null
          vercel_domain: string | null
          vercel_project_id: string | null
        }
        Insert: {
          build_completed_at?: string | null
          build_started_at?: string | null
          build_status?: string | null
          created_at?: string | null
          custom_domain?: string | null
          deployment_logs?: Json | null
          deployment_platform?: string | null
          deployment_status?: string | null
          github_repo_url?: string | null
          id?: string
          last_deployed_at?: string | null
          netlify_build_hook_url?: string | null
          netlify_deployment_id?: string | null
          netlify_site_id?: string | null
          products_config?: Json
          site_config?: Json
          site_name: string
          status?: string | null
          updated_at?: string | null
          user_id: string
          vercel_deployment_id?: string | null
          vercel_domain?: string | null
          vercel_project_id?: string | null
        }
        Update: {
          build_completed_at?: string | null
          build_started_at?: string | null
          build_status?: string | null
          created_at?: string | null
          custom_domain?: string | null
          deployment_logs?: Json | null
          deployment_platform?: string | null
          deployment_status?: string | null
          github_repo_url?: string | null
          id?: string
          last_deployed_at?: string | null
          netlify_build_hook_url?: string | null
          netlify_deployment_id?: string | null
          netlify_site_id?: string | null
          products_config?: Json
          site_config?: Json
          site_name?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
          vercel_deployment_id?: string | null
          vercel_domain?: string | null
          vercel_project_id?: string | null
        }
        Relationships: []
      }
      temp_sites: {
        Row: {
          business_analyzed: boolean | null
          completion_percentage: number | null
          created_at: string | null
          current_step: string | null
          generate_status: boolean | null
          id: string
          products_config: Json
          project_name: string
          site_config: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          business_analyzed?: boolean | null
          completion_percentage?: number | null
          created_at?: string | null
          current_step?: string | null
          generate_status?: boolean | null
          id?: string
          products_config?: Json
          project_name: string
          site_config?: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          business_analyzed?: boolean | null
          completion_percentage?: number | null
          created_at?: string | null
          current_step?: string | null
          generate_status?: boolean | null
          id?: string
          products_config?: Json
          project_name?: string
          site_config?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      hybrid_section_search: {
        Args: {
          query_text: string
          query_embedding: string
          match_threshold?: number
          match_count?: number
          industry_filter?: string
        }
        Returns: {
          id: string
          section_type: string
          title: string
          description: string
          category: string
          schema_data: Json
          examples: Json[]
          search_method: string
          score: number
        }[]
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      match_sections: {
        Args: {
          query_embedding: string
          match_threshold?: number
          match_count?: number
          industry_filter?: string
        }
        Returns: {
          id: string
          section_type: string
          title: string
          description: string
          category: string
          schema_data: Json
          examples: Json[]
          industry_tags: string[]
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
