package com.example.dropbox.service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.*;
import java.nio.file.*;
import java.util.*;
import com.example.dropbox.model.FileMetadata;
import com.example.dropbox.repository.FileMetadataRepository;

@Service
public class FileService {
    @Value("${file.upload-dir}")
    private String uploadDir;
    private final FileMetadataRepository repository;

    public FileService(FileMetadataRepository repository) {
        this.repository = repository;
    }

    public FileMetadata saveFile(MultipartFile file) throws IOException {
        // Validate file type
        String contentType = file.getContentType();
        if (contentType == null ||
                !(contentType.equals("text/plain") || contentType.equals("image/jpeg") ||
                        contentType.equals("image/png") || contentType.equals("application/json"))) {
            throw new IllegalArgumentException("Unsupported file type.");
        }
        Files.createDirectories(Paths.get(uploadDir));
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        FileMetadata meta = new FileMetadata();
        meta.setFilename(filename);
        meta.setOriginalFilename(file.getOriginalFilename());
        meta.setContentType(contentType);
        meta.setSize(file.getSize());
        meta.setUploadDate(java.time.LocalDateTime.now());
        return repository.save(meta);
    }

    public List<FileMetadata> getAllFiles() {
        return repository.findAll();
    }

    public File getFile(Long id) throws FileNotFoundException {
        FileMetadata meta = repository.findById(id)
                .orElseThrow(() -> new FileNotFoundException("File not found"));
        Path filePath = Paths.get(uploadDir, meta.getFilename());
        return filePath.toFile();
    }

    public FileMetadata getMetadata(Long id) {
        return repository.findById(id).orElseThrow(() -> new NoSuchElementException("File not found"));
    }
}
