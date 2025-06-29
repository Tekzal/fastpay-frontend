import React from 'react';
import Modal from './Modal';

const ImportModal = ({
  isOpen,
  onClose,
  onDownloadTemplate,
  onImport,
  importing,
  importResult,
  activeSection,
  acceptedFileTypes = ['.xlsx', '.csv']
}) => {
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!acceptedFileTypes.includes(`.${fileExtension}`)) {
      alert(`Invalid file type. Please use one of: ${acceptedFileTypes.join(', ')}`);
      return;
    }
    
    onImport(file);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Import ${activeSection}`}>
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Before importing:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Download the template file</li>
            <li>Fill in your data following the template format</li>
            <li>Save the file and upload it here</li>
          </ol>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={importing}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              {importing ? 'Importing...' : 'Upload File'}
            </button>
            <button
              onClick={onDownloadTemplate}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Template
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept={acceptedFileTypes.join(',')}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {importResult && (
          <div className={`mt-4 p-4 rounded-lg ${
            importResult.failed > 0 ? 'bg-red-50' : 'bg-green-50'
          }`}>
            <h4 className="font-medium mb-2">Import Results:</h4>
            <div className="space-y-2 text-sm">
              <p className="text-green-700">Successfully imported: {importResult.success}</p>
              {importResult.failed > 0 && (
                <>
                  <p className="text-red-700">Failed to import: {importResult.failed}</p>
                  <div className="mt-2">
                    <p className="font-medium text-red-700">Errors:</p>
                    <ul className="list-disc list-inside text-red-600">
                      {importResult.errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ImportModal; 