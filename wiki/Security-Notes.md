# Security Notes

## Potential risks

- Unsafe file uploads
- Malformed spreadsheet content
- Temporary file exposure
- Large file abuse
- Repeated request abuse in public deployments

## Mitigation ideas

- Validate file type and file size strictly.
- Keep temporary upload and output files isolated.
- Remove generated files when they are no longer needed.
- Validate request parameters before processing.
- Add authentication and rate limiting if the app becomes public.
- Monitor server activity and error logs.

## Operational guidance

The current project is designed for controlled use cases where users upload spreadsheet files intentionally. If the deployment scope grows, security controls should be expanded accordingly.
