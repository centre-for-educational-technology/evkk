package ee.tlu.evkk.common.io;

import org.springframework.core.io.Resource;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.nio.channels.ReadableByteChannel;
import java.util.Objects;

/**
 * @author Mikk Tarvas
 * Date: 25.02.2020
 */
public class ResourceWrapper implements Resource {

  private final Resource delegate;

  public ResourceWrapper(@NonNull Resource delegate) {
    Objects.requireNonNull(delegate, "delegate must not be null");
    this.delegate = delegate;
  }

  /**
   * Returns underlying {@link Resource}
   *
   * @return original wrapped resource
   */
  @NonNull
  public Resource getDelegate() {
    return delegate;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean exists() {
    return getDelegate().exists();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isReadable() {
    return getDelegate().isReadable();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isOpen() {
    return getDelegate().isOpen();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isFile() {
    return getDelegate().isFile();
  }

  /**
   * {@inheritDoc}
   */
  @NonNull
  @Override
  public URL getURL() throws IOException {
    return getDelegate().getURL();
  }

  /**
   * {@inheritDoc}
   */
  @NonNull
  @Override
  public URI getURI() throws IOException {
    return getDelegate().getURI();
  }

  /**
   * {@inheritDoc}
   */
  @NonNull
  @Override
  public File getFile() throws IOException {
    return getDelegate().getFile();
  }

  /**
   * {@inheritDoc}
   */
  @NonNull
  @Override
  public ReadableByteChannel readableChannel() throws IOException {
    return getDelegate().readableChannel();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public long contentLength() throws IOException {
    return getDelegate().contentLength();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public long lastModified() throws IOException {
    return getDelegate().lastModified();
  }

  /**
   * {@inheritDoc}
   */
  @NonNull
  @Override
  public Resource createRelative(@NonNull String relativePath) throws IOException {
    return getDelegate().createRelative(relativePath);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Nullable
  public String getFilename() {
    return getDelegate().getFilename();
  }

  /**
   * {@inheritDoc}
   */
  @NonNull
  @Override
  public String getDescription() {
    return getDelegate().getDescription();
  }

  /**
   * {@inheritDoc}
   */
  @NonNull
  @Override
  public InputStream getInputStream() throws IOException {
    return getDelegate().getInputStream();
  }

}
