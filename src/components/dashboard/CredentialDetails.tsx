
const CredentialDetails = ( {credential} : CredentialDetailsProps ) => {

    // Nothing to render when no credential is selected
    if (!credential) {
        return null;
    }

    return (
        <div>
            <h1>Credential Details</h1>
        </div>
    );
}

export default CredentialDetails;